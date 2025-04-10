import { IncreaseInventoryUseCase } from '../increase-inventory.use-case';
import { NotFoundException } from '@nestjs/common';
import { Inventory } from 'src/inventories/domain/entities/inventory.entity';

describe('IncreaseInventoryUseCase', () => {
  let useCase: IncreaseInventoryUseCase;
  let inventoryRepository: any;
  let productRepository: any;

  beforeEach(() => {
    inventoryRepository = {
      findByProductId: jest.fn(),
      updateQuantity: jest.fn(),
      create: jest.fn(),
    };

    productRepository = {
      getById: jest.fn(),
    };

    useCase = new IncreaseInventoryUseCase(
      inventoryRepository,
      productRepository,
    );
  });

  const productMock = {
    id: 1,
    name: 'Café',
    product_type_id: 1,
    region_id: 1,
    description: 'Suave',
    price: 10,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    image: null,
  };

  const inventoryMock: Inventory = {
    id: 1,
    productId: 1,
    quantity: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should throw NotFoundException if product does not exist', async () => {
    productRepository.getById.mockResolvedValue(null);

    await expect(useCase.execute(1, 5)).rejects.toThrow(
      new NotFoundException('Product with ID 1 not found'),
    );

    expect(inventoryRepository.updateQuantity).not.toHaveBeenCalled();
    expect(inventoryRepository.create).not.toHaveBeenCalled();
  });

  it('should update inventory quantity if inventory exists', async () => {
    productRepository.getById.mockResolvedValue(productMock);
    inventoryRepository.findByProductId.mockResolvedValue(inventoryMock);
    inventoryRepository.updateQuantity.mockResolvedValue({
      product_id: 1,
      quantity: 10,
    });

    const result = await useCase.execute(1, 5);

    expect(result).toEqual({ product_id: 1, quantity: 10 });
    expect(inventoryRepository.updateQuantity).toHaveBeenCalledWith(1, 10);
  });

  it('should create inventory if it does not exist', async () => {
    productRepository.getById.mockResolvedValue(productMock);
    inventoryRepository.findByProductId.mockResolvedValue(null);
    inventoryRepository.create.mockResolvedValue({
      product_id: 1,
      quantity: 5,
    });

    const result = await useCase.execute(1, 5);

    expect(result).toEqual({ product_id: 1, quantity: 5 });
    expect(inventoryRepository.create).toHaveBeenCalledWith(1, 5);
  });
});
