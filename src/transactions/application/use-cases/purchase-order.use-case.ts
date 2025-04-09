import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CustomerRepository } from 'src/customers/domain/ports/customer.repository';
import { WompiGatewayPort } from 'src/transactions/domain/ports/payment-gateway.port';
import { generateTransactionReference } from 'src/common/helpers/generate-transaction-reference.helper';
import { retryTransactionStatus } from 'src/common/helpers/retry-transaction-status.helper';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionStatus } from '@prisma/client';
import { WinstonLogger } from 'src/common/logger/winston-logger.service';
import { TransactionRepository } from 'src/transactions/domain/ports/transaction.repository';
import { CreateTransactionDto } from 'src/transactions/interfaces/dto/create-transaction.dto';
import { InventoryRepository } from 'src/inventories/domain/ports/inventory.repository';
import { CreateSaleUseCase } from 'src/sales/application/use-cases/create-sale.use-case';

@Injectable()
export class PurchaseOrderUseCase {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,

    @Inject('WompiPaymentGatewayPort')
    private readonly paymentGateway: WompiGatewayPort,

    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,

    @Inject('InventoryRepository')
    private readonly inventoryRepository: InventoryRepository,

    @Inject('CreateSaleUseCase')
    private readonly createSaleUseCase: CreateSaleUseCase,

    private readonly prisma: PrismaService,
    private readonly logger: WinstonLogger,
  ) {}

  async execute(dto: CreateTransactionDto) {
    const { customer, card, amountInCents, currency, products, installments } =
      dto;

    try {
      // 1. Validar inventario
      for (const p of products) {
        const inventory = await this.inventoryRepository.findByProductId(
          p.productId,
        );
        console.log(
          `🧪 Checking productId=${p.productId} - Requested=${p.quantity} - InStock=${inventory?.quantity ?? 0}`,
        );

        if (!inventory || Number(p.quantity) > Number(inventory.quantity)) {
          throw new UnprocessableEntityException(
            `Insufficient inventory for product ${p.productId}`,
          );
        }
      }

      // 2. Buscar o crear cliente
      let customerRecord = await this.customerRepository.findByDocumentNumber(
        customer.documentNumber,
      );
      if (!customerRecord) {
        customerRecord = await this.customerRepository.findByEmail(
          customer.email,
        );
      }
      if (!customerRecord) {
        customerRecord = await this.customerRepository.create(customer);
      }

      // 3. Tokenizar tarjeta
      const tokenized = await this.paymentGateway.tokenizeCard(card);

      // 4. Obtener tokens de aceptación
      const { general, personal } =
        await this.paymentGateway.getAcceptanceTokens();

      // 5. Crear referencia y transacción en Wompi
      const reference = generateTransactionReference();
      const wompiTransaction = await this.paymentGateway.createTransaction({
        amountInCents,
        currency,
        customerEmail: customer.email,
        token: tokenized.id,
        acceptanceToken: general,
        acceptPersonalAuth: personal,
        installments,
        reference,
      });

      let finalStatus = wompiTransaction.status;

      // 6. Guardar transacción inicial (aunque esté en PENDING)
      const transaction = await this.transactionRepository.create(
        {
          customerId: customerRecord.id,
          transactionId: wompiTransaction.id,
          reference: wompiTransaction.reference,
          status: finalStatus as TransactionStatus,
        },
        this.prisma, // si no usás transaction scope
      );

      // 7. Retry si queda en PENDING
      if (finalStatus === 'PENDING') {
        finalStatus = await retryTransactionStatus(
          async () => {
            const { status } = await this.paymentGateway.getTransactionStatus(
              wompiTransaction.id,
            );
            return status;
          },
          3,
          3000,
          this.logger,
        );

        await this.transactionRepository.updateStatus(
          wompiTransaction.id,
          finalStatus as TransactionStatus,
        );

        if (finalStatus !== 'APPROVED') {
          throw new UnprocessableEntityException(
            `Transaction failed with status: ${finalStatus}`,
          );
        }
      }

      // 8. Si fue aprobada, continuar con la venta, productos y reducción de inventario
      if (finalStatus === 'APPROVED') {
        const totalAmount = products.reduce(
          (sum, p) => sum + p.price * p.quantity,
          0,
        );

        await this.createSaleUseCase.execute({
          transactionId: transaction.id,
          address: customer.address,
          totalAmount: amountInCents,
          details: products.map((p) => ({
            productId: p.productId,
            price: p.price,
            quantity: p.quantity,
          })),
        });
      }

      return {
        message: 'Transaction processed successfully',
        data: {
          transactionId: wompiTransaction.id,
          reference: wompiTransaction.reference,
          status: finalStatus,
        },
      };
    } catch (error) {
      this.logger.error(
        'Error in purchase process',
        error.stack || error.message,
      );

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          success: false,
          message: 'Error processing transaction',
          data: [error.stack || error.message],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
