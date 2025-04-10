import { GetCustomerByDocumentUseCase } from '../get-customer-by-document.use-case';
import { NotFoundException } from '@nestjs/common';
import { Customer } from 'src/customers/domain/entities/customer.entity';

describe('GetCustomerByDocumentUseCase', () => {
  let useCase: GetCustomerByDocumentUseCase;
  let customerRepository: any;

  beforeEach(() => {
    customerRepository = {
      findByDocumentNumber: jest.fn(),
    };

    useCase = new GetCustomerByDocumentUseCase(customerRepository);
  });

  it('should return a customer if found', async () => {
    const mockCustomer: Customer = {
      id: 1,
      name: 'Pedro test',
      email: 'pedro@test.com',
      cellphone: '123456789',
      documentNumber: 'ABC123',
    };

    customerRepository.findByDocumentNumber.mockResolvedValue(mockCustomer);

    const result = await useCase.execute('ABC123');

    expect(result).toEqual(mockCustomer);
    expect(customerRepository.findByDocumentNumber).toHaveBeenCalledWith(
      'ABC123',
    );
  });

  it('should throw NotFoundException if customer is not found', async () => {
    customerRepository.findByDocumentNumber.mockResolvedValue(null);

    await expect(useCase.execute('ABC123')).rejects.toThrow(
      new NotFoundException('Customer with document ABC123 not found'),
    );

    expect(customerRepository.findByDocumentNumber).toHaveBeenCalledWith(
      'ABC123',
    );
  });
});
