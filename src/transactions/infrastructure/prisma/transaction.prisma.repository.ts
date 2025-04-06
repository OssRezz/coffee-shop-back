// src/transactions/infrastructure/prisma/transaction.prisma.repository.ts

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionRepository } from 'src/transactions/domain/ports/transaction.repository';
import { TransactionStatus, Prisma } from '@prisma/client';
import { WinstonLogger } from 'src/common/logger/winston-logger.service';
import { Transaction } from 'src/transactions/domain/domain/transaction.entity';

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
}
