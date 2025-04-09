import { Inject, Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/ports/transaction.repository';
import { TransactionWithSalesDto } from 'src/transactions/domain/domain/transaction-with-sales.dto';

@Injectable()
export class GetTransactionWithSalesUseCase {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(transactionId: string): Promise<TransactionWithSalesDto> {
    return this.transactionRepository.getTransactionWithSales(transactionId);
  }
}
