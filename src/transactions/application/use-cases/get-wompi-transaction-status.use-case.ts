import { Inject, Injectable } from '@nestjs/common';
import { WompiGatewayPort } from '../../domain/ports/payment-gateway.port';

@Injectable()
export class GetWompiTransactionStatusUseCase {
  constructor(
    @Inject('WompiPaymentGatewayPort')
    private readonly gateway: WompiGatewayPort,
  ) {}

  async execute(transactionId: string) {
    return this.gateway.getTransactionStatus(transactionId);
  }
}
