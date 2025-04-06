import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TransactionController } from './interfaces/controllers/transaction.controller';
import { WompiTokenizeCardUseCase } from './application/use-cases/wompi-tokenize-card.use-case';
import { WompiGateway } from './infrastructure/wompi/wompi.gateway';
import { WinstonLogger } from 'src/common/logger/winston-logger.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetWompiAcceptanceTokenUseCase } from './application/use-cases/get-wompi-acceptance-token.use-case';
import { WompiCreateTransactionUseCase } from './application/use-cases/create-wompi-transaction.use-case';
import { GetWompiTransactionStatusUseCase } from './application/use-cases/get-wompi-transaction-status.use-case';
import { PurchaseOrderUseCase } from './application/use-cases/purchase-order.use-case';
import { CustomerPrismaRepository } from 'src/customers/infrastructure/prisma/customer.prisma.repository';
import { TransactionPrismaRepository } from './infrastructure/prisma/transaction.prisma.repository';
import { InventoryPrismaRepository } from 'src/inventories/infrastructure/prisma/inventory.prisma.repository';

@Module({
  imports: [HttpModule],
  controllers: [TransactionController],
  providers: [
    WinstonLogger,
    PrismaService,
    WompiGateway,
    WompiTokenizeCardUseCase,
    GetWompiAcceptanceTokenUseCase,
    WompiCreateTransactionUseCase,
    GetWompiTransactionStatusUseCase,
    PurchaseOrderUseCase,
    TransactionPrismaRepository,
    CustomerPrismaRepository,
    InventoryPrismaRepository,
    {
      provide: 'WompiPaymentGatewayPort',
      useClass: WompiGateway,
    },
    {
      provide: 'CustomerRepository',
      useExisting: CustomerPrismaRepository,
    },
    {
      provide: 'TransactionRepository',
      useClass: TransactionPrismaRepository,
    },
    {
      provide: 'InventoryRepository',
      useClass: InventoryPrismaRepository,
    },
  ],
  exports: [],
})
export class TransactionModule {}
