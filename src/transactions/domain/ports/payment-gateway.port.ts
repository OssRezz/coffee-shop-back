export interface WompiGatewayPort {
  tokenizeCard(data: {
    cardNumber: string;
    cvc: string;
    expMonth: string;
    expYear: string;
    cardHolder: string;
  }): Promise<{ id: string }>;

  getAcceptanceTokens(): Promise<{
    general: string;
    personal: string;
  }>;

  createTransaction(data: {
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
  }>;

  getTransactionStatus(transactionId: string): Promise<{
    id: string;
    status: string;
    finalizedAt: string | null;
    amountInCents: number;
    currency: string;
    reference: string;
    customerEmail: string;
    paymentMethod: {
      type: string;
      brand: string;
      lastFour: string;
    };
  }>;
}
