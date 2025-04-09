import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionRepository } from 'src/transactions/domain/ports/transaction.repository';
import { TransactionStatus, Prisma } from '@prisma/client';
import { WinstonLogger } from 'src/common/logger/winston-logger.service';
import { Transaction } from 'src/transactions/domain/domain/transaction.entity';
import {
  ProductDto,
  SaleDetailDto,
  SaleDto,
  TransactionWithSalesDto,
} from 'src/transactions/domain/domain/transaction-with-sales.dto';

@Injectable()
export class TransactionPrismaRepository implements TransactionRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: WinstonLogger,
  ) {}

  async create(
    data: {
      customerId: number;
      transactionId: string;
      reference: string;
      status: TransactionStatus;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<Transaction> {
    try {
      const repo = tx ?? this.prisma;

      const created = await repo.transaction.create({
        data: {
          customerId: data.customerId,
          transactionId: data.transactionId,
          reference: data.reference,
          status: data.status,
        },
      });

      return new Transaction(
        created.id,
        created.customerId,
        created.transactionId,
        created.reference,
        created.status,
        created.createdAt,
        created.updatedAt,
      );
    } catch (error) {
      this.logger.error('Error creating transaction', error.stack);
      throw new InternalServerErrorException('Error creating transaction');
    }
  }

  async updateStatus(
    transactionId: string,
    status: TransactionStatus,
  ): Promise<Transaction> {
    try {
      const updated = await this.prisma.transaction.update({
        where: { transactionId },
        data: { status },
      });

      return new Transaction(
        updated.id,
        updated.customerId,
        updated.transactionId,
        updated.reference,
        updated.status,
        updated.createdAt,
        updated.updatedAt,
      );
    } catch (error) {
      this.logger.error('Error updating transaction status', error.stack);
      throw new InternalServerErrorException(
        'Error updating transaction status',
      );
    }
  }

  async getTransactionWithSales(
    transactionId: string,
  ): Promise<TransactionWithSalesDto> {
    try {
      const transaction = await this.prisma.transaction.findUniqueOrThrow({
        where: { transactionId },
        include: {
          sale: {
            include: {
              details: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });

      const sales =
        transaction.sale?.map(
          (sale) =>
            new SaleDto(
              sale.id,
              Number(sale.totalAmount),
              sale.address,
              sale.details.map(
                (detail) =>
                  new SaleDetailDto(
                    detail.productId,
                    Number(detail.price),
                    detail.quantity,
                    new ProductDto(
                      detail.product.id,
                      detail.product.name,
                      Number(detail.product.price),
                      detail.product.image,
                    ),
                  ),
              ),
            ),
        ) ?? [];

      return new TransactionWithSalesDto(
        transaction.id,
        transaction.transactionId,
        transaction.reference,
        transaction.status,
        transaction.createdAt,
        transaction.updatedAt,
        sales,
      );
    } catch (error) {
      this.logger.error('Error getting transaction with sales', error.stack);
      throw new NotFoundException('Transaction not found');
    }
  }
}
