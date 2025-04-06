import { Inject, Injectable } from '@nestjs/common';
import { WompiGatewayPort } from '../../domain/ports/payment-gateway.port';
import { generateTransactionReference } from 'src/common/helpers/generate-transaction-reference.helper';

@Injectable()
export class WompiCreateTransactionUseCase {
  constructor(
    @Inject('WompiPaymentGatewayPort')
    private readonly gateway: WompiGatewayPort,
  ) {}

  async execute(data: {
    amountInCents: number;
    currency: string;
    customerEmail: string;
    token: string;
    acceptanceToken: string;
    acceptPersonalAuth: string;
    installments: number;
  }) {
    const reference = generateTransactionReference();

    return this.gateway.createTransaction({
      ...data,
      reference,
    });
  }
}
