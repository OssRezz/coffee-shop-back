import { WompiCreateTransactionUseCase } from '../create-wompi-transaction.use-case';
import { WompiGatewayPort } from 'src/transactions/domain/ports/payment-gateway.port';
import * as helper from 'src/common/helpers/generate-transaction-reference.helper';

describe('WompiCreateTransactionUseCase', () => {
  let useCase: WompiCreateTransactionUseCase;
  let gateway: jest.Mocked<WompiGatewayPort>;

  beforeEach(() => {
    gateway = {
      createTransaction: jest.fn(),
    } as any;

    useCase = new WompiCreateTransactionUseCase(gateway);

    // Mockeamos la generación de referencia
    jest
      .spyOn(helper, 'generateTransactionReference')
      .mockReturnValue('TEST_REF_123');
  });

  const inputData = {
    amountInCents: 1500000,
    currency: 'COP',
    customerEmail: 'cliente@example.com',
    token: 'tok_abc123',
    reference: 'TEST_REF_123',
    acceptanceToken: 'accept_token_456',
    acceptPersonalAuth: 'personal_accept_789',
    installments: 1,
  };

  it('should call the payment gateway with generated reference', async () => {
    const mockResponse = {
      id: 'txn_001',
      status: 'PENDING',
      amountInCents: 10000,
      reference: 'TEST_REF_123',
      customerEmail: 'cliente@example.com',
    };

    gateway.createTransaction.mockResolvedValue(mockResponse);

    const result = await useCase.execute(inputData);

    expect(helper.generateTransactionReference).toHaveBeenCalled();
    expect(gateway.createTransaction).toHaveBeenCalledWith({
      ...inputData,
      reference: 'TEST_REF_123',
    });
    expect(result).toEqual(mockResponse);
  });
});
