import { CreateEntryUseCase } from '../create-entry.use-case';
import { NotFoundException } from '@nestjs/common';
import { Entry } from 'src/entries/domain/entities/entry.entity';

describe('CreateEntryUseCase', () => {
  let useCase: CreateEntryUseCase;
  let entryRepository: any;
  let productRepository: any;
  let inventoryRepository: any;

  beforeEach(() => {
    entryRepository = {
      create: jest.fn(),
    };

    productRepository = {
      getById: jest.fn(),
    };

    inventoryRepository = {
      findByProductId: jest.fn(),
      updateQuantity: jest.fn(),
      create: jest.fn(),
    };

    useCase = new CreateEntryUseCase(
      entryRepository,
      productRepository,
      inventoryRepository,
    );
  });

  const productMock = {
    id: 1,
    name: 'Café',
    product_type_id: 1,
    region_id: 1,
    description: 'Café fuerte',
    price: 25,
    status: true,
    created_at: new Date(),
    updated_at: new Date(),
    image: null,
  };

  const entryMock: Entry = {
    id: 1,
    productId: 1,
    quantity: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should throw NotFoundException if product does not exist', async () => {
    productRepository.getById.mockResolvedValue(null);

    await expect(useCase.execute(1, 10)).rejects.toThrow(
      new NotFoundException('Product with ID 1 not found'),
    );

    expect(entryRepository.create).not.toHaveBeenCalled();
  });

  it('should create entry and update inventory if inventory exists', async () => {
    productRepository.getById.mockResolvedValue(productMock);
    entryRepository.create.mockResolvedValue(entryMock);
    inventoryRepository.findByProductId.mockResolvedValue({
      product_id: 1,
      quantity: 20,
    });

    const result = await useCase.execute(1, 10);

    expect(result).toEqual(entryMock);
    expect(entryRepository.create).toHaveBeenCalledWith(1, 10);
    expect(inventoryRepository.updateQuantity).toHaveBeenCalledWith(1, 30); // 20 + 10
    expect(inventoryRepository.create).not.toHaveBeenCalled();
  });

  it('should create entry and create inventory if it does not exist', async () => {
    productRepository.getById.mockResolvedValue(productMock);
    entryRepository.create.mockResolvedValue(entryMock);
    inventoryRepository.findByProductId.mockResolvedValue(null);

    const result = await useCase.execute(1, 10);

    expect(result).toEqual(entryMock);
    expect(entryRepository.create).toHaveBeenCalledWith(1, 10);
    expect(inventoryRepository.create).toHaveBeenCalledWith(1, 10);
    expect(inventoryRepository.updateQuantity).not.toHaveBeenCalled();
  });
});
