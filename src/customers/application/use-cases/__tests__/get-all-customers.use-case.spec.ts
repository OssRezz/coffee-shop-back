import { GetAllCustomersUseCase } from '../get-all-customers.use-case';
import { Customer } from 'src/customers/domain/entities/customer.entity';

describe('GetAllCustomersUseCase', () => {
  let useCase: GetAllCustomersUseCase;
  let customerRepository: any;

  beforeEach(() => {
    customerRepository = {
      getAll: jest.fn(),
    };

    useCase = new GetAllCustomersUseCase(customerRepository);
  });

  it('should return a list of customers', async () => {
    const mockCustomers: Customer[] = [
      {
        id: 1,
        name: 'Ana Testing',
        email: 'ana@test.com',
        cellphone: '123456789',
        documentNumber: '123',
      },
      {
        id: 2,
        name: 'Luis Testing',
        email: 'luis@test.com',
        cellphone: '987654321',
        documentNumber: '456',
      },
    ];

    customerRepository.getAll.mockResolvedValue(mockCustomers);

    const result = await useCase.execute();
    expect(result).toEqual(mockCustomers);
    expect(customerRepository.getAll).toHaveBeenCalled();
  });

  it('should return an empty array if no customers found', async () => {
    customerRepository.getAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(customerRepository.getAll).toHaveBeenCalled();
  });
});
