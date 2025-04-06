export class Transaction {
  constructor(
    public readonly id: number,
    public readonly customerId: number,
    public readonly transactionId: string,
    public readonly reference: string,
    public status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR',
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
