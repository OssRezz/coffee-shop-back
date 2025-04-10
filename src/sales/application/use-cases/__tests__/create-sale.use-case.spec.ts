import { CreateSaleUseCase } from '../create-sale.use-case';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateSaleDto } from 'src/sales/interfaces/dto/create-sale.dto';
import { Sale } from 'src/sales/domain/entities/sale.entity';

describe('CreateSaleUseCase', () => {
  let useCase: CreateSaleUseCase;
  let saleRepository: any;
  let inventoryRepository: any;

  beforeEach(() => {
    saleRepository = {
      create: jest.fn(),
    };

    inventoryRepository = {
      findByProductId: jest.fn(),
      updateQuantity: jest.fn(),
    };

    useCase = new CreateSaleUseCase(saleRepository, inventoryRepository);
  });

  const dto: CreateSaleDto = {
    transactionId: 1,
    address: 'Calle 123',
    totalAmount: 100,
    details: [
      { productId: 1, price: 50, quantity: 1 },
      { productId: 2, price: 25, quantity: 2 },
    ],
  };

  const mockInventories = {
    1: { product_id: 1, quantity: 10 },
    2: { product_id: 2, quantity: 5 },
  };

  it('should throw NotFoundException if inventory not found', async () => {
    inventoryRepository.findByProductId.mockImplementation((id) =>
      id === 1 ? null : mockInventories[id],
    );

    await expect(useCase.execute(dto)).rejects.toThrow(
      new NotFoundException('Inventory not found for product 1'),
    );

    expect(saleRepository.create).not.toHaveBeenCalled();
  });

  it('should throw BadRequestException if inventory is insufficient', async () => {
    inventoryRepository.findByProductId.mockResolvedValue({
      product_id: 1,
      quantity: 0,
    });

    await expect(
      useCase.execute({
        ...dto,
        details: [{ productId: 1, price: 50, quantity: 1 }],
      }),
    ).rejects.toThrow(
      new BadRequestException('Insufficient inventory for product 1'),
    );

    expect(saleRepository.create).not.toHaveBeenCalled();
  });

  it('should create a sale and update inventories successfully', async () => {
    inventoryRepository.findByProductId.mockImplementation((id) =>
      Promise.resolve(mockInventories[id]),
    );

    saleRepository.create.mockImplementation(async (sale, details) => {
      return {
        ...sale,
        id: 1,
        details,
      };
    });

    const result = await useCase.execute(dto);

    expect(inventoryRepository.updateQuantity).toHaveBeenCalledWith(1, 9); // 10 - 1
    expect(inventoryRepository.updateQuantity).toHaveBeenCalledWith(2, 3); // 5 - 2
    expect(saleRepository.create).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: 1,
      address: 'Calle 123',
      totalAmount: 100,
      status: 'COMPLETED',
      details: expect.any(Array),
    });
  });
});
