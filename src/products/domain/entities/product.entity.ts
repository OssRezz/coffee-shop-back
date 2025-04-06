export class Product {
  constructor(
    public readonly id: number,
    public name: string,
    public productTypeId: number,
    public regionId: number,
    public description: string,
    public price: number,
    public status: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public image?: string | null,
    public productTypeName?: string,
    public regionName?: string,
  ) {}
}
