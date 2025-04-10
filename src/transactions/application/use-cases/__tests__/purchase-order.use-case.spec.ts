import { PurchaseOrderUseCase } from '../purchase-order.use-case';
import { UnprocessableEntityException } from '@nestjs/common';

describe('PurchaseOrderUseCase', () => {
  let useCase: PurchaseOrderUseCase;
  let customerRepository: any;
  let paymentGateway: any;
  let transactionRepository: any;
  let inventoryRepository: any;
  let createSaleUseCase: any;
  let prisma: any;
  let logger: any;

  beforeEach(() => {
    customerRepository = {
      findByDocumentNumber: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    paymentGateway = {
      tokenizeCard: jest.fn(),
      getAcceptanceTokens: jest.fn(),
      createTransaction: jest.fn(),
      getTransactionStatus: jest.fn(),
    };

    transactionRepository = {
      create: jest.fn(),
      updateStatus: jest.fn(),
    };

    inventoryRepository = {
      findByProductId: jest.fn(),
    };

    createSaleUseCase = {
      execute: jest.fn(),
    };

    logger = {
      log: jest.fn(),
      error: jest.fn(),
    };

    prisma = {};

    useCase = new PurchaseOrderUseCase(
      customerRepository,
      paymentGateway,
      transactionRepository,
      inventoryRepository,
      createSaleUseCase,
      prisma,
      logger,
    );
  });

  it('should process transaction and create sale successfully', async () => {
    const dto = {
      customer: {
        name: 'Cliente Prueba',
        documentNumber: '123',
        email: 'cliente@example.com',
        address: 'Calle 123',
        cellphone: '1234567890',
      },
      card: {
        cardNumber: '4111111111111111',
        cvc: '123',
        expMonth: '12',
        expYear: '25',
        cardHolder: 'Cliente Prueba',
      },
      amountInCents: 10000,
      currency: 'COP',
      installments: 1,
      products: [{ productId: 1, quantity: 2, price: 5000 }],
    };

    // Mocks para flujo exitoso
    inventoryRepository.findByProductId.mockResolvedValue({
      product_id: 1,
      quantity: 10,
    });
    customerRepository.findByDocumentNumber.mockResolvedValue(null);
    customerRepository.findByEmail.mockResolvedValue(null);
    customerRepository.create.mockResolvedValue({ id: 1, ...dto.customer });

    paymentGateway.tokenizeCard.mockResolvedValue({ id: 'token_123' });
    paymentGateway.getAcceptanceTokens.mockResolvedValue({
      general: 'general_token',
      personal: 'personal_token',
    });

    paymentGateway.createTransaction.mockResolvedValue({
      id: 'txn_123',
      reference: 'REF_123',
      status: 'APPROVED',
    });

    transactionRepository.create.mockResolvedValue({
      id: 99,
      transactionId: 'txn_123',
      reference: 'REF_123',
      status: 'APPROVED',
    });

    const result = await useCase.execute(dto);

    expect(inventoryRepository.findByProductId).toHaveBeenCalledWith(1);
    expect(customerRepository.create).toHaveBeenCalled();
    expect(paymentGateway.tokenizeCard).toHaveBeenCalledWith(dto.card);
    expect(paymentGateway.createTransaction).toHaveBeenCalled();
    expect(transactionRepository.create).toHaveBeenCalled();
    expect(createSaleUseCase.execute).toHaveBeenCalledWith({
      transactionId: 99,
      address: 'Calle 123',
      totalAmount: 10000,
      details: [{ productId: 1, price: 5000, quantity: 2 }],
    });

    expect(result).toEqual({
      message: 'Transaction processed successfully',
      data: {
        transactionId: 'txn_123',
        reference: 'REF_123',
        status: 'APPROVED',
      },
    });
  });

  it('should throw UnprocessableEntityException if inventory is insufficient', async () => {
    const dto = {
      customer: {
        name: 'Cliente',
        documentNumber: '123',
        email: 'test@example.com',
        address: 'Calle Falsa',
        cellphone: '1234567890',
      },
      card: {
        cardNumber: '4111',
        cvc: '123',
        expMonth: '12',
        expYear: '25',
        cardHolder: 'Cliente',
      },
      amountInCents: 10000,
      currency: 'COP',
      installments: 1,
      products: [{ productId: 1, quantity: 5, price: 2000 }],
    };

    inventoryRepository.findByProductId.mockResolvedValue({
      product_id: 1,
      quantity: 2,
    });

    await expect(useCase.execute(dto)).rejects.toThrow(
      UnprocessableEntityException,
    );
    expect(inventoryRepository.findByProductId).toHaveBeenCalledWith(1);
  });

  it('should throw if transaction remains pending and ends as DECLINED', async () => {
    const dto = {
      customer: {
        name: 'Cliente',
        documentNumber: '123',
        email: 'test@example.com',
        address: 'Calle',
        cellphone: '1234567890',
      },
      card: {
        cardNumber: '4111',
        cvc: '123',
        expMonth: '12',
        expYear: '25',
        cardHolder: 'Cliente',
      },
      amountInCents: 10000,
      currency: 'COP',
      installments: 1,
      products: [{ productId: 1, quantity: 1, price: 10000 }],
    };

    inventoryRepository.findByProductId.mockResolvedValue({
      product_id: 1,
      quantity: 10,
    });
    customerRepository.findByDocumentNumber.mockResolvedValue(null);
    customerRepository.findByEmail.mockResolvedValue(null);
    customerRepository.create.mockResolvedValue({ id: 1 });

    paymentGateway.tokenizeCard.mockResolvedValue({ id: 'token_xyz' });
    paymentGateway.getAcceptanceTokens.mockResolvedValue({
      general: 'g',
      personal: 'p',
    });

    paymentGateway.createTransaction.mockResolvedValue({
      id: 'txn_456',
      reference: 'REF456',
      status: 'PENDING',
    });

    transactionRepository.create.mockResolvedValue({
      id: 123,
      status: 'PENDING',
    });

    paymentGateway.getTransactionStatus
      .mockResolvedValueOnce({ status: 'PENDING' })
      .mockResolvedValueOnce({ status: 'PENDING' })
      .mockResolvedValueOnce({ status: 'DECLINED' });

    await expect(useCase.execute(dto)).rejects.toMatchObject({
      response: expect.objectContaining({
        message: 'Transaction failed with status: DECLINED',
        error: 'Unprocessable Entity',
        statusCode: 422,
      }),
      status: 422,
    });

    expect(paymentGateway.getTransactionStatus).toHaveBeenCalledTimes(3);
    expect(transactionRepository.updateStatus).toHaveBeenCalledWith(
      'txn_456',
      'DECLINED',
    );
  });

  it('should throw HttpException if unexpected error occurs', async () => {
    const dto = {
      customer: {
        name: 'Cliente',
        documentNumber: '123',
        email: 'test@example.com',
        address: 'Calle',
        cellphone: '1234567890',
      },
      card: {
        cardNumber: '4111',
        cvc: '123',
        expMonth: '12',
        expYear: '25',
        cardHolder: 'Cliente',
      },
      amountInCents: 10000,
      currency: 'COP',
      installments: 1,
      products: [{ productId: 1, quantity: 1, price: 10000 }],
    };

    // Simular un error inesperado en tokenización
    inventoryRepository.findByProductId.mockResolvedValue({
      product_id: 1,
      quantity: 10,
    });
    customerRepository.findByDocumentNumber.mockResolvedValue(null);
    customerRepository.findByEmail.mockResolvedValue(null);
    customerRepository.create.mockResolvedValue({ id: 1 });
    paymentGateway.tokenizeCard.mockRejectedValue(new Error('Boom!'));

    await expect(useCase.execute(dto)).rejects.toMatchObject(
      /Error processing transaction/,
    );
    expect(logger.error).toHaveBeenCalled();
  });
});
