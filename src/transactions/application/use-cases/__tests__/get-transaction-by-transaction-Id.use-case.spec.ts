import { GetTransactionWithSalesUseCase } from '../get-transaction-by-transaction-Id.use-case';
import { TransactionWithSalesDto } from 'src/transactions/domain/domain/transaction-with-sales.dto';

describe('GetTransactionWithSalesUseCase', () => {
  let useCase: GetTransactionWithSalesUseCase;
  let transactionRepository: any;

  beforeEach(() => {
    transactionRepository = {
      getTransactionWithSales: jest.fn(),
    };

    useCase = new GetTransactionWithSalesUseCase(transactionRepository);
  });

  it('should return a transaction with sales', async () => {
    const mockDto = new TransactionWithSalesDto(
      1,
      'txn_001',
      'REF_001',
      'COMPLETED',
      new Date('2024-01-01'),
      new Date('2024-01-01'),
      [],
    );

    transactionRepository.getTransactionWithSales.mockResolvedValue(mockDto);

    const result = await useCase.execute('txn_001');

    expect(transactionRepository.getTransactionWithSales).toHaveBeenCalledWith(
      'txn_001',
    );
    expect(result).toBe(mockDto);
  });
});
