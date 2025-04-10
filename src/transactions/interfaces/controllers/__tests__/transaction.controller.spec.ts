import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from 'src/transactions/interfaces/controllers/transaction.controller';
import { WompiTokenizeCardUseCase } from 'src/transactions/application/use-cases/wompi-tokenize-card.use-case';
import { GetWompiAcceptanceTokenUseCase } from 'src/transactions/application/use-cases/get-wompi-acceptance-token.use-case';
import { WompiCreateTransactionUseCase } from 'src/transactions/application/use-cases/create-wompi-transaction.use-case';
import { GetWompiTransactionStatusUseCase } from 'src/transactions/application/use-cases/get-wompi-transaction-status.use-case';
import { PurchaseOrderUseCase } from 'src/transactions/application/use-cases/purchase-order.use-case';
import { GetTransactionWithSalesUseCase } from 'src/transactions/application/use-cases/get-transaction-by-transaction-Id.use-case';
import { CreateTransactionDto } from 'src/transactions/interfaces/dto/create-transaction.dto';
import { WompiCreateTransactionDto } from 'src/transactions/interfaces/dto/wompi-create-transaction.dto';
import { WompiTokenizeCardDto } from 'src/transactions/interfaces/dto/wompi-tokenize-card.dto';
import { buildResponse } from 'src/common/helpers/response.helper';

describe('TransactionController', () => {
  let controller: TransactionController;
  let tokenizeUseCase: WompiTokenizeCardUseCase;
  let acceptanceTokenUseCase: GetWompiAcceptanceTokenUseCase;
  let createTransactionUseCase: WompiCreateTransactionUseCase;
  let getStatusUseCase: GetWompiTransactionStatusUseCase;
  let purchaseOrderUseCase: PurchaseOrderUseCase;
  let getTransactionUseCase: GetTransactionWithSalesUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        { provide: WompiTokenizeCardUseCase, useValue: { execute: jest.fn() } },
        {
          provide: GetWompiAcceptanceTokenUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: WompiCreateTransactionUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetWompiTransactionStatusUseCase,
          useValue: { execute: jest.fn() },
        },
        { provide: PurchaseOrderUseCase, useValue: { execute: jest.fn() } },
        {
          provide: GetTransactionWithSalesUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get(TransactionController);
    tokenizeUseCase = module.get(WompiTokenizeCardUseCase);
    acceptanceTokenUseCase = module.get(GetWompiAcceptanceTokenUseCase);
    createTransactionUseCase = module.get(WompiCreateTransactionUseCase);
    getStatusUseCase = module.get(GetWompiTransactionStatusUseCase);
    purchaseOrderUseCase = module.get(PurchaseOrderUseCase);
    getTransactionUseCase = module.get(GetTransactionWithSalesUseCase);
  });

  it('should call checkout', async () => {
    const dto = {} as CreateTransactionDto;
    const mockResponse = {
      message: 'Transaction processed successfully',
      data: {
        transactionId: 'tx_123',
        reference: 'ref_123',
        status: 'APPROVED',
      },
    };

    jest.spyOn(purchaseOrderUseCase, 'execute').mockResolvedValue(mockResponse);

    const result = await controller.checkout(dto);

    expect(result).toEqual(mockResponse);
    expect(purchaseOrderUseCase.execute).toHaveBeenCalledWith(dto);
  });

  it('should tokenize card', async () => {
    const dto = {} as WompiTokenizeCardDto;
    const mockToken = { id: 'token_xyz' };
    jest.spyOn(tokenizeUseCase, 'execute').mockResolvedValue(mockToken);

    const result = await controller.tokenize(dto);
    expect(result).toEqual(mockToken);
    expect(tokenizeUseCase.execute).toHaveBeenCalledWith(dto);
  });

  it('should get acceptance tokens', async () => {
    const tokens = { general: 'g_token', personal: 'p_token' };
    jest.spyOn(acceptanceTokenUseCase, 'execute').mockResolvedValue(tokens);

    const result = await controller.getAcceptanceTokens();
    expect(result).toEqual(tokens);
    expect(acceptanceTokenUseCase.execute).toHaveBeenCalled();
  });

  it('should create wompi transaction', async () => {
    const dto = {} as WompiCreateTransactionDto;

    const mockResponse = {
      id: 'tx_456',
      status: 'PENDING',
      amountInCents: 10000,
      reference: 'order-abc123',
      customerEmail: 'test@example.com',
    };

    jest
      .spyOn(createTransactionUseCase, 'execute')
      .mockResolvedValue(mockResponse);

    const result = await controller.create(dto);
    expect(result).toEqual(mockResponse);
    expect(createTransactionUseCase.execute).toHaveBeenCalledWith(dto);
  });

  it('should get wompi transaction status', async () => {
    const mockStatus = {
      id: '1',
      status: 'APPROVED',
      finalizedAt: null,
      amountInCents: 10000,
      currency: 'COP',
      reference: 'refe_xxx',
      customerEmail: 'OssRezz.13@gmail.com',
      paymentMethod: {
        type: 'CARD',
        brand: 'VISA',
        lastFour: '44242',
      },
    };

    jest.spyOn(getStatusUseCase, 'execute').mockResolvedValue(mockStatus);

    const result = await controller.getStatus('txn_789');
    expect(result).toEqual(mockStatus);
    expect(getStatusUseCase.execute).toHaveBeenCalledWith('txn_789');
  });
});
