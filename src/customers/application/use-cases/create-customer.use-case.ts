import {
  Injectable,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/interfaces/dto/create-customer.dto';
import { CustomerRepository } from 'src/customers/domain/ports/customer.repository';
import { Customer } from 'src/customers/domain/entities/customer.entity';

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(dto: CreateCustomerDto): Promise<Customer> {
    const [byDoc, byEmail] = await Promise.all([
      this.customerRepository.findByDocumentNumber(dto.documentNumber),
      this.customerRepository.findByEmail(dto.email),
    ]);

    if (byDoc) {
      throw new UnprocessableEntityException('Document number already exists');
    }

    if (byEmail) {
      throw new UnprocessableEntityException('Email already exists');
    }

    return await this.customerRepository.create(dto);
  }
}
