import { Inject, Injectable } from '@nestjs/common';
import { WompiGatewayPort } from 'src/transactions/domain/ports/payment-gateway.port';

@Injectable()
export class WompiTokenizeCardUseCase {
  constructor(
    @Inject('WompiPaymentGatewayPort')
    private readonly gateway: WompiGatewayPort,
  ) {}

  async execute(data: {
    cardNumber: string;
    cvc: string;
    expMonth: string;
    expYear: string;
    cardHolder: string;
  }) {
    return this.gateway.tokenizeCard(data);
  }
}
