import { GetWompiAcceptanceTokenUseCase } from '../get-wompi-acceptance-token.use-case';
import { WompiGatewayPort } from 'src/transactions/domain/ports/payment-gateway.port';

describe('GetWompiAcceptanceTokenUseCase', () => {
  let useCase: GetWompiAcceptanceTokenUseCase;
  let paymentGateway: jest.Mocked<WompiGatewayPort>;

  beforeEach(() => {
    paymentGateway = {
      getAcceptanceTokens: jest.fn(),
    } as any;

    useCase = new GetWompiAcceptanceTokenUseCase(paymentGateway);
  });

  it('should call paymentGateway.getAcceptanceTokens and return result', async () => {
    const mockResponse = {
      general: 'acc_token_123',
      personal: 'personal_token_456',
    };

    paymentGateway.getAcceptanceTokens.mockResolvedValue(mockResponse);

    const result = await useCase.execute();

    expect(paymentGateway.getAcceptanceTokens).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });
});
