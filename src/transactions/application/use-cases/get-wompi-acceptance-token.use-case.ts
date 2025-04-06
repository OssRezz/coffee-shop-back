import { Inject, Injectable } from '@nestjs/common';
import { WompiGatewayPort } from '../../domain/ports/payment-gateway.port';

@Injectable()
export class GetWompiAcceptanceTokenUseCase {
  constructor(
    @Inject('WompiPaymentGatewayPort')
    private readonly paymentGateway: WompiGatewayPort,
  ) {}

  async execute() {
    return this.paymentGateway.getAcceptanceTokens();
  }
}
