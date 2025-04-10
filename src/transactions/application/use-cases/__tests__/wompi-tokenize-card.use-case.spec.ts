import { WompiTokenizeCardUseCase } from '../wompi-tokenize-card.use-case';
import { WompiGatewayPort } from 'src/transactions/domain/ports/payment-gateway.port';

describe('WompiTokenizeCardUseCase', () => {
  let useCase: WompiTokenizeCardUseCase;
  let gateway: jest.Mocked<WompiGatewayPort>;

  beforeEach(() => {
    gateway = {
      tokenizeCard: jest.fn(),
      createTransaction: jest.fn(),
      getAcceptanceTokens: jest.fn(),
      getTransactionStatus: jest.fn(),
    };

    useCase = new WompiTokenizeCardUseCase(gateway);
  });

  it('should call tokenizeCard with correct data and return result', async () => {
    const input = {
      cardNumber: '4111111111111111',
      cvc: '123',
      expMonth: '12',
      expYear: '25',
      cardHolder: 'James Tester',
    };

    const mockResponse = {
      id: 'tok_123456',
      status: 'AVAILABLE',
    };

    gateway.tokenizeCard.mockResolvedValue(mockResponse);

    const result = await useCase.execute(input);

    expect(gateway.tokenizeCard).toHaveBeenCalledWith(input);
    expect(result).toEqual(mockResponse);
  });
});
