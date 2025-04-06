// src/transactions/domain/ports/transaction.repository.ts

import { Transaction } from '../domain/transaction.entity';
import { TransactionStatus } from '@prisma/client';
import { Prisma } from '@prisma/client';

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
}
