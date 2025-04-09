export class ProductDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: number,
    public readonly image: string | null,
  ) {}
}

export class SaleDetailDto {
  constructor(
    public readonly productId: number,
    public readonly price: number,
    public readonly quantity: number,
    public readonly product: ProductDto,
  ) {}
}

export class SaleDto {
  constructor(
    public readonly id: number,
    public readonly totalAmount: number,
    public readonly address: string,
    public readonly details: SaleDetailDto[],
  ) {}
}

export class TransactionWithSalesDto {
  constructor(
    public readonly id: number,
    public readonly transactionId: string,
    public readonly reference: string,
    public readonly status: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly sales: SaleDto[],
  ) {}
}
