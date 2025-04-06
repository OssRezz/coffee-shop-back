export class Customer {
  constructor(
    public readonly id: number,
    public documentNumber: string,
    public name: string,
    public email: string,
    public cellphone: string,
  ) {}
}
