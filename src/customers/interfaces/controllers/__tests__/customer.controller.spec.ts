import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from '../customer.controller';
import { CreateCustomerUseCase } from 'src/customers/application/use-cases/create-customer.use-case';
import { GetAllCustomersUseCase } from 'src/customers/application/use-cases/get-all-customers.use-case';
import { GetCustomerByDocumentUseCase } from 'src/customers/application/use-cases/get-customer-by-document.use-case';

describe('CustomerController', () => {
  let controller: CustomerController;
  let getAllCustomersUseCase: GetAllCustomersUseCase;
  let createCustomerUseCase: CreateCustomerUseCase;
  let getCustomerByDocumentUseCase: GetCustomerByDocumentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: GetAllCustomersUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: CreateCustomerUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetCustomerByDocumentUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get(CustomerController);
    getAllCustomersUseCase = module.get(GetAllCustomersUseCase);
    createCustomerUseCase = module.get(CreateCustomerUseCase);
    getCustomerByDocumentUseCase = module.get(GetCustomerByDocumentUseCase);
  });

  it('should return all customers', async () => {
    const customers = [
      {
        id: 1,
        name: 'James',
        documentNumber: '123456',
        cellphone: '123456789',
        email: 'james@example.com',
      },
    ];
    jest.spyOn(getAllCustomersUseCase, 'execute').mockResolvedValue(customers);

    const result = await controller.getAll();

    expect(result).toEqual({
      success: true,
      message: 'All customers',
      data: customers,
      code: 200,
    });
  });

  it('should create a customer', async () => {
    const dto = {
      name: 'James',
      email: 'james@example.com',
      documentNumber: '123456',
      address: 'Street 1',
      cellphone: '123456789',
    };
    const created = { id: 1, ...dto };

    jest.spyOn(createCustomerUseCase, 'execute').mockResolvedValue(created);

    const result = await controller.create(dto);

    expect(createCustomerUseCase.execute).toHaveBeenCalledWith(dto);
    expect(result).toEqual({
      message: 'Customer created successfully',
      data: created,
    });
  });

  it('should return customer by document', async () => {
    const document = '123456';
    const customer = {
      id: 1,
      name: 'James',
      documentNumber: '123456',
      cellphone: '123456789',
      email: 'james@example.com',
    };

    jest
      .spyOn(getCustomerByDocumentUseCase, 'execute')
      .mockResolvedValue(customer);

    const result = await controller.getByDocument(document);

    expect(getCustomerByDocumentUseCase.execute).toHaveBeenCalledWith(document);
    expect(result).toEqual({
      message: `Customer with document ${document} found`,
      data: customer,
    });
  });
});
