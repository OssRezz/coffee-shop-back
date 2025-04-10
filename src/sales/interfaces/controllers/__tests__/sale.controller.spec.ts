import { Test, TestingModule } from '@nestjs/testing';
import { SaleController } from '../sale.controller';
import { CreateSaleUseCase } from 'src/sales/application/use-cases/create-sale.use-case';
import { CreateSaleDto } from '../../dto/create-sale.dto';
import { Sale } from 'src/sales/domain/entities/sale.entity';

describe('SaleController', () => {
  let controller: SaleController;
  let createSaleUseCase: CreateSaleUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleController],
      providers: [
        {
          provide: CreateSaleUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SaleController>(SaleController);
    createSaleUseCase = module.get<CreateSaleUseCase>(CreateSaleUseCase);
  });

  it('should create a sale successfully', async () => {
    const dto: CreateSaleDto = {
      transactionId: 123,
      address: 'Calle 123',
      totalAmount: 20000,
      details: [{ productId: 1, price: 10000, quantity: 2 }],
    };

    const createdSale: Sale = new Sale(
      1,
      dto.transactionId ?? null,
      dto.address,
      dto.totalAmount,
      'COMPLETED',
      new Date(),
      new Date(),
    );

    jest.spyOn(createSaleUseCase, 'execute').mockResolvedValue(createdSale);

    const result = await controller.create(dto);

    expect(result).toEqual({
      success: true,
      message: 'Sale created successfully',
      data: createdSale,
    });

    expect(createSaleUseCase.execute).toHaveBeenCalledWith(dto);
  });
});
