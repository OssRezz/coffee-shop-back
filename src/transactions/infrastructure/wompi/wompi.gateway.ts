import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { WinstonLogger } from 'src/common/logger/winston-logger.service';
import { WompiGatewayPort } from 'src/transactions/domain/ports/payment-gateway.port';
import { firstValueFrom } from 'rxjs';
import { generateWompiSignature } from 'src/common/helpers/generate-wompi-signature.helper';

@Injectable()
export class WompiGateway implements WompiGatewayPort {
  private readonly apiUrl: string | undefined;
  private readonly publicKey: string | undefined;
  private readonly privateKey: string | undefined;
  private readonly integrityKey: string | undefined;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
    private readonly logger: WinstonLogger,
  ) {
    this.apiUrl = this.config.get<string>('WOMPI_API_URL');
    this.publicKey = this.config.get<string>('WOMPI_PUBLIC_KEY');
    this.privateKey = this.config.get<string>('WOMPI_PRIVATE_KEY') || '';
    this.integrityKey = this.config.get<string>('WOMPI_INTEGRITY_KEY') || '';
  }

  async tokenizeCard(data: {
    cardNumber: string;
    cvc: string;
    expMonth: string;
    expYear: string;
    cardHolder: string;
  }): Promise<{ id: string }> {
    try {
      const response = await firstValueFrom(
        this.http.post(
          `${this.apiUrl}/tokens/cards`,
          {
            number: data.cardNumber,
            cvc: data.cvc,
            exp_month: data.expMonth,
            exp_year: data.expYear,
            card_holder: data.cardHolder,
          },
          {
            headers: {
              Authorization: `Bearer ${this.publicKey}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      return { id: response.data.data.id };
    } catch (error) {
      const wompiError =
        error?.response?.data?.error || error?.message || 'Unexpected error';

      this.logger.error(
        'Error tokenizing card',
        JSON.stringify(wompiError, null, 2),
      );

      throw new HttpException(
        {
          success: false,
          message: 'Error tokenizing card',
          data: [wompiError],
        },
        error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAcceptanceTokens(): Promise<{
    general: string;
    personal: string;
  }> {
    try {
      const response = await firstValueFrom(
        this.http.get(`${this.apiUrl}/merchants/${this.publicKey}`),
      );

      const general = response.data.data.presigned_acceptance.acceptance_token;
      const personal =
        response.data.data.presigned_personal_data_auth.acceptance_token;

      return {
        general,
        personal,
      };
    } catch (error) {
      this.logger.error(
        'Error getting acceptance tokens',
        JSON.stringify(error?.response?.data || error),
      );

      throw new HttpException(
        {
          success: false,
          message: 'Error getting acceptance tokens',
          data: [error?.response?.data?.error || 'Unexpected error'],
        },
        error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createTransaction({
    amountInCents,
    currency,
    customerEmail,
    token,
    reference,
    acceptanceToken,
    acceptPersonalAuth,
    installments,
  }: {
    amountInCents: number;
    currency: string;
    customerEmail: string;
    token: string;
    reference: string;
    acceptanceToken: string;
    acceptPersonalAuth: string;
    installments: number;
  }): Promise<{
    id: string;
    status: string;
    amountInCents: number;
    reference: string;
    customerEmail: string;
  }> {
    if (!this.integrityKey) {
      throw new Error('WOMPI_PRIVATE_KEY is missing in environment variables');
    }

    if (!this.privateKey) {
      throw new Error('WOMPI_PRIVATE_KEY is missing in environment variables');
    }

    if (!this.publicKey) {
      throw new Error('WOMPI_PUBLIC_KEY is missing in environment variables');
    }

    if (!this.apiUrl) {
      throw new Error('WOMPI_API_URL is missing in environment variables');
    }

    const signature = generateWompiSignature({
      reference,
      amountInCents,
      currency,
      integrityKey: this.integrityKey,
    });

    console.log(signature);

    try {
      const response = await firstValueFrom(
        this.http.post(
          `${this.apiUrl}/transactions`,
          {
            amount_in_cents: amountInCents,
            currency: currency,
            customer_email: customerEmail,
            reference: reference,
            acceptance_token: acceptanceToken,
            accept_personal_auth: acceptPersonalAuth,
            payment_method: {
              type: 'CARD',
              token: token,
              installments: installments,
            },
            signature: signature,
          },
          {
            headers: {
              Authorization: `Bearer ${this.privateKey}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      const res = response.data.data;

      return {
        id: res.id,
        status: res.status,
        amountInCents: res.amount_in_cents,
        reference: res.reference,
        customerEmail: res.customer_email,
      };
    } catch (error) {
      this.logger.error(
        'Error creating transaction',
        JSON.stringify(error?.response?.data || error),
      );

      throw new HttpException(
        {
          success: false,
          message: 'Error creating transaction',
          data: error?.response?.data?.error || 'Unexpected error',
        },
        error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTransactionStatus(transactionId: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.get(`${this.apiUrl}/transactions/${transactionId}`),
      );

      const data = response.data.data;

      return {
        id: data.id,
        status: data.status,
        finalizedAt: data.finalized_at,
        amountInCents: data.amount_in_cents,
        currency: data.currency,
        reference: data.reference,
        customerEmail: data.customer_email,
        paymentMethod: {
          type: data.payment_method?.type,
          brand: data.payment_method?.extra?.brand,
          lastFour: data.payment_method?.extra?.last_four,
        },
      };
    } catch (error) {
      this.logger.error(
        'Error fetching transaction status from Wompi',
        JSON.stringify(error?.response?.data || error),
      );

      throw new HttpException(
        {
          success: false,
          message: 'Error fetching transaction status from Wompi',
          data: error?.response?.data?.error || 'Unexpected error',
        },
        error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
