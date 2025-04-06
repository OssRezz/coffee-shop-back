export class Entry {
  constructor(
    public readonly id: number,
    public productId: number,
    public quantity: number,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}
}
