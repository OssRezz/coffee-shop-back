import { UpdateProductUseCase } from '../updated-product.use-case';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Product } from 'src/products/domain/entities/product.entity';
import { UpdateProductDto } from 'src/products/interfaces/dto/update-product.dto';

describe('UpdateProductUseCase', () => {
  let useCase: UpdateProductUseCase;
  let productRepository: any;
  let productTypeRepository: any;
  let regionRepository: any;

  beforeEach(() => {
    productRepository = {
      getById: jest.fn(),
      update: jest.fn(),
    };

    productTypeRepository = {
      exists: jest.fn(),
    };

    regionRepository = {
      exists: jest.fn(),
    };

    useCase = new UpdateProductUseCase(
      productRepository,
      productTypeRepository,
      regionRepository,
    );
  });

  const existingProduct: Product = {
    id: 1,
    name: 'Café original',
    productTypeId: 1,
    regionId: 1,
    description: 'Café suave',
    price: 22000,
    status: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
    image: 'cafe.jpg',
  };

  const dto: UpdateProductDto = {
    name: 'Café premium',
    product_type_id: 1,
    region_id: 1,
    description: 'Café más fuerte',
    price: 45000,
    status: true,
    image: 'premium.jpg',
  };

  it('should update the product successfully', async () => {
    productRepository.getById.mockResolvedValue(existingProduct);
    productTypeRepository.exists.mockResolvedValue(true);
    regionRepository.exists.mockResolvedValue(true);

    const updated = {
      ...existingProduct,
      ...dto,
      updated_at: expect.any(Date),
    };

    productRepository.update.mockResolvedValue(updated);

    const result = await useCase.execute(1, dto);

    expect(result.name).toBe('Café premium');
    expect(productRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        name: 'Café premium',
        description: 'Café más fuerte',
        price: 45000,
        image: 'premium.jpg',
      }),
    );
  });

  it('should throw NotFoundException if product does not exist', async () => {
    productRepository.getById.mockResolvedValue(null);

    await expect(useCase.execute(999, dto)).rejects.toThrow(
      new NotFoundException('Product with ID 999 not found'),
    );

    expect(productRepository.update).not.toHaveBeenCalled();
  });

  it('should throw BadRequestException if product type does not exist', async () => {
    productRepository.getById.mockResolvedValue(existingProduct);
    productTypeRepository.exists.mockResolvedValue(false);

    await expect(useCase.execute(1, dto)).rejects.toThrow(
      new BadRequestException('The product type does not exist'),
    );

    expect(productRepository.update).not.toHaveBeenCalled();
  });

  it('should throw BadRequestException if region does not exist', async () => {
    productRepository.getById.mockResolvedValue(existingProduct);
    productTypeRepository.exists.mockResolvedValue(true);
    regionRepository.exists.mockResolvedValue(false);

    await expect(useCase.execute(1, dto)).rejects.toThrow(
      new BadRequestException('The region does not exist'),
    );

    expect(productRepository.update).not.toHaveBeenCalled();
  });
});
