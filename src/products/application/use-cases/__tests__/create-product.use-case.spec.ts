import { CreateProductUseCase } from '../create-product.use-case';
import { BadRequestException } from '@nestjs/common';
import { CreateProductDto } from 'src/products/interfaces/dto/create-product.dto';
import { Product } from 'src/products/domain/entities/product.entity';

describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase;
  let productRepository: any;
  let productTypeRepository: any;
  let regionRepository: any;

  beforeEach(() => {
    productRepository = {
      create: jest.fn(),
    };

    productTypeRepository = {
      exists: jest.fn(),
    };

    regionRepository = {
      exists: jest.fn(),
    };

    useCase = new CreateProductUseCase(
      productRepository,
      productTypeRepository,
      regionRepository,
    );
  });

  it('should create a product successfully', async () => {
    const dto: CreateProductDto = {
      name: 'Café Premium',
      product_type_id: 1,
      region_id: 2,
      description: 'Café de alta calidad',
      price: 25.5,
      status: true,
      image: 'image.jpg',
    };

    productTypeRepository.exists.mockResolvedValue(true);
    regionRepository.exists.mockResolvedValue(true);
    productRepository.create.mockImplementation((product: Product) =>
      Promise.resolve({ ...product, id: 99 }),
    );

    const result = await useCase.execute(dto);

    expect(result.id).toBe(99);
    expect(result.name).toBe('Café Premium');
    expect(productRepository.create).toHaveBeenCalled();
  });

  it('should throw if product type does not exist', async () => {
    const dto: CreateProductDto = {
      name: 'Café Premium',
      product_type_id: 1,
      region_id: 2,
      description: 'Café de alta calidad',
      price: 25.5,
    };

    productTypeRepository.exists.mockResolvedValue(false);

    await expect(useCase.execute(dto)).rejects.toThrow(
      new BadRequestException('The product type does not exist'),
    );

    expect(productTypeRepository.exists).toHaveBeenCalledWith(1);
    expect(regionRepository.exists).not.toHaveBeenCalled();
    expect(productRepository.create).not.toHaveBeenCalled();
  });

  it('should throw if region does not exist', async () => {
    const dto: CreateProductDto = {
      name: 'Café Premium',
      product_type_id: 1,
      region_id: 2,
      description: 'Café de alta calidad',
      price: 25.5,
    };

    productTypeRepository.exists.mockResolvedValue(true);
    regionRepository.exists.mockResolvedValue(false);

    await expect(useCase.execute(dto)).rejects.toThrow(
      new BadRequestException('The region does not exist'),
    );

    expect(regionRepository.exists).toHaveBeenCalledWith(2);
    expect(productRepository.create).not.toHaveBeenCalled();
  });
});
