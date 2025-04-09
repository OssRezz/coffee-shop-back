import { Transaction } from '../domain/transaction.entity';
import { TransactionStatus } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { TransactionWithSalesDto } from '../domain/transaction-with-sales.dto';

export interface TransactionRepository {
  create(
    data: {
      customerId: number;
      transactionId: string;
      reference: string;
      status: TransactionStatus;
    },
    tx?: Prisma.TransactionClient,
  ): Promise<Transaction>;

  updateStatus(
    transactionId: string,
    status: TransactionStatus,
  ): Promise<Transaction>;

  getTransactionWithSales(
    transactionId: string,
  ): Promise<TransactionWithSalesDto>;
}
