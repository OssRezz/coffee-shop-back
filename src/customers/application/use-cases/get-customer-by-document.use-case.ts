import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from 'src/customers/domain/ports/customer.repository';
import { Customer } from 'src/customers/domain/entities/customer.entity';

@Injectable()
export class GetCustomerByDocumentUseCase {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(documentNumber: string): Promise<Customer> {
    const customer =
      await this.customerRepository.findByDocumentNumber(documentNumber);

    if (!customer) {
      throw new NotFoundException(
        `Customer with document ${documentNumber} not found`,
      );
    }

    return customer;
  }
}
