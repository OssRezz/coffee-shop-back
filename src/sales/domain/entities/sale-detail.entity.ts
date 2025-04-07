export class SaleDetail {
  constructor(
    public readonly id: number,
    public saleId: number,
    public productId: number,
    public price: number,
    public quantity: number,
  ) {}
}
