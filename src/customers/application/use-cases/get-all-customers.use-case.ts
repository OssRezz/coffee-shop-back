import { Inject, Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/customers/domain/ports/customer.repository';
import { Customer } from 'src/customers/domain/entities/customer.entity';

@Injectable()
export class GetAllCustomersUseCase {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(): Promise<Customer[]> {
    return this.customerRepository.getAll();
  }
}
