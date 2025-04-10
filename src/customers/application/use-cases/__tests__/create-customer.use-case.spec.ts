import { CreateCustomerUseCase } from '../create-customer.use-case';
import { UnprocessableEntityException } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/interfaces/dto/create-customer.dto';
import { Customer } from 'src/customers/domain/entities/customer.entity';

describe('CreateCustomerUseCase', () => {
  let useCase: CreateCustomerUseCase;
  let customerRepository: any;

  beforeEach(() => {
    customerRepository = {
      findByDocumentNumber: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    useCase = new CreateCustomerUseCase(customerRepository);
  });

  it('should create a customer when document and email are unique', async () => {
    const dto: CreateCustomerDto = {
      name: 'Usuario de test',
      email: 'test@gmail.com',
      cellphone: '3002334567',
      documentNumber: '12345678',
    };

    customerRepository.findByDocumentNumber.mockResolvedValue(null);
    customerRepository.findByEmail.mockResolvedValue(null);
    customerRepository.create.mockResolvedValue({ id: 1, ...dto } as Customer);

    const result = await useCase.execute(dto);

    expect(result).toEqual({ id: 1, ...dto });
    expect(customerRepository.create).toHaveBeenCalledWith(dto);
  });

  it('should throw if document number already exists', async () => {
    const dto: CreateCustomerDto = {
      name: 'Usuario de test',
      email: 'test@gmail.com',
      cellphone: '3002334567',
      documentNumber: '12345678',
    };

    customerRepository.findByDocumentNumber.mockResolvedValue({ id: '2' });
    customerRepository.findByEmail.mockResolvedValue(null);

    await expect(useCase.execute(dto)).rejects.toThrow(
      new UnprocessableEntityException('Document number already exists'),
    );
  });

  it('should throw if email already exists', async () => {
    const dto: CreateCustomerDto = {
      name: 'Usuario de test',
      email: 'test@gmail.com',
      cellphone: '3002334567',
      documentNumber: '12345678',
    };

    customerRepository.findByDocumentNumber.mockResolvedValue(null);
    customerRepository.findByEmail.mockResolvedValue({ id: '2' });

    await expect(useCase.execute(dto)).rejects.toThrow(
      new UnprocessableEntityException('Email already exists'),
    );
  });
});
