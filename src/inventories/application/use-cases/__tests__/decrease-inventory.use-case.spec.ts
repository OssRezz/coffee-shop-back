import { DecreaseInventoryUseCase } from '../decrease-inventory.use-case';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Inventory } from 'src/inventories/domain/entities/inventory.entity';

describe('DecreaseInventoryUseCase', () => {
  let useCase: DecreaseInventoryUseCase;
  let inventoryRepository: any;
  let productRepository: any;

  beforeEach(() => {
    inventoryRepository = {
      findByProductId: jest.fn(),
      updateQuantity: jest.fn(),
    };

    productRepository = {
      getById: jest.fn(),
    };

    useCase = new DecreaseInventoryUseCase(
      inventoryRepository,
      productRepository,
    );
  });

  const productMock = {
    id: 1,
    name: 'Café',
    product_type_id: 1,
    region_id: 1,
    description: 'Fuerte',
    price: 10,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    image: null,
  };

  const inventoryMock: Inventory = {
    id: 1,
    productId: 1,
    quantity: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should throw NotFoundException if product does not exist', async () => {
    productRepository.getById.mockResolvedValue(null);

    await expect(useCase.execute(1, 5)).rejects.toThrow(
      new NotFoundException('Product with ID 1 not found'),
    );

    expect(inventoryRepository.updateQuantity).not.toHaveBeenCalled();
  });

  it('should throw NotFoundException if inventory does not exist', async () => {
    productRepository.getById.mockResolvedValue(productMock);
    inventoryRepository.findByProductId.mockResolvedValue(null);

    await expect(useCase.execute(1, 5)).rejects.toThrow(
      new NotFoundException('No inventory found for product ID 1'),
    );

    expect(inventoryRepository.updateQuantity).not.toHaveBeenCalled();
  });

  it('should throw BadRequestException if not enough inventory', async () => {
    productRepository.getById.mockResolvedValue(productMock);
    inventoryRepository.findByProductId.mockResolvedValue({
      product_id: 1,
      quantity: 2,
    });

    await expect(useCase.execute(1, 5)).rejects.toThrow(
      new BadRequestException('Insufficient inventory for product ID 1'),
    );

    expect(inventoryRepository.updateQuantity).not.toHaveBeenCalled();
  });

  it('should decrease inventory successfully', async () => {
    productRepository.getById.mockResolvedValue(productMock);
    inventoryRepository.findByProductId.mockResolvedValue(inventoryMock);
    inventoryRepository.updateQuantity.mockResolvedValue({
      product_id: 1,
      quantity: 15,
    });

    const result = await useCase.execute(1, 5);

    expect(result).toEqual({ product_id: 1, quantity: 15 });
    expect(inventoryRepository.updateQuantity).toHaveBeenCalledWith(1, 15);
  });
});
