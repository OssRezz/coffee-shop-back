import { Customer } from '../entities/customer.entity';

export interface CustomerRepository {
  getAll(): Promise<Customer[]>;
  create(data: {
    documentNumber: string;
    name: string;
    email: string;
    cellphone: string;
  }): Promise<Customer>;
  findByDocumentNumber(documentNumber: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<Customer | null>;
}
