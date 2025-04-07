import { SaleStatus } from '@prisma/client';
export class Sale {
  constructor(
    public readonly id: number,
    public transactionId: number | null,
    public address: string,
    public totalAmount: number,
    public status: SaleStatus,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}
}
