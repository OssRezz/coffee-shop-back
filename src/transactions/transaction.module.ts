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

@Module({
  imports: [HttpModule],
  controllers: [TransactionController],
  providers: [
    WinstonLogger,
    PrismaService,
    WompiTokenizeCardUseCase,
    GetWompiAcceptanceTokenUseCase,
    WompiCreateTransactionUseCase,
    GetWompiTransactionStatusUseCase,
    {
      provide: 'WompiPaymentGatewayPort',
      useClass: WompiGateway,
    },
  ],
  exports: [],
})
export class TransactionModule {}
