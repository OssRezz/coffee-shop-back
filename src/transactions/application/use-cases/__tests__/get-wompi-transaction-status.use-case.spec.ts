import { GetWompiTransactionStatusUseCase } from '../get-wompi-transaction-status.use-case';
import { WompiGatewayPort } from 'src/transactions/domain/ports/payment-gateway.port';

describe('GetWompiTransactionStatusUseCase', () => {
  let useCase: GetWompiTransactionStatusUseCase;
  let gateway: jest.Mocked<WompiGatewayPort>;

  beforeEach(() => {
    gateway = {
      getTransactionStatus: jest.fn(),
    } as any;

    useCase = new GetWompiTransactionStatusUseCase(gateway);
  });

  it('should return transaction status from the gateway', async () => {
    const transactionId = 'txn_abc123';

    const mockResponse = {
      id: transactionId,
      status: 'APPROVED',
      finalizedAt: '2025-04-09T10:00:00Z',
      amountInCents: 10000,
      currency: 'COP',
      reference: 'REF123',
      customerEmail: 'user@example.com',
      paymentMethod: {
        type: 'CARD',
        brand: 'VISA',
        lastFour: '1234',
      },
    };

    gateway.getTransactionStatus.mockResolvedValue(mockResponse);

    const result = await useCase.execute(transactionId);

    expect(gateway.getTransactionStatus).toHaveBeenCalledWith(transactionId);
    expect(result).toEqual(mockResponse);
  });
});
