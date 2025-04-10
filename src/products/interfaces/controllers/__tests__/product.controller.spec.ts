import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { CreateProductUseCase } from 'src/products/application/use-cases/create-product.use-case';
import { GetAllProductsUseCase } from 'src/products/application/use-cases/get-all-products.use-case';
import { UpdateProductUseCase } from 'src/products/application/use-cases/updated-product.use-case';
import { GetProductByIdUseCase } from 'src/products/application/use-cases/get-product-by-id.use-case';
import { CreateProductDto } from '../../dto/create-product.dto';
import { UpdateProductDto } from '../../dto/update-product.dto';
import * as fs from 'fs';
import { plainToInstance } from 'class-transformer';
import { Product } from 'src/products/domain/entities/product.entity';

jest.mock('fs');

describe('ProductController', () => {
  let controller: ProductController;
  let createUseCase: CreateProductUseCase;
  let getAllUseCase: GetAllProductsUseCase;
  let updateUseCase: UpdateProductUseCase;
  let getByIdUseCase: GetProductByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: CreateProductUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetAllProductsUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateProductUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetProductByIdUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get(ProductController);
    createUseCase = module.get(CreateProductUseCase);
    getAllUseCase = module.get(GetAllProductsUseCase);
    updateUseCase = module.get(UpdateProductUseCase);
    getByIdUseCase = module.get(GetProductByIdUseCase);
  });

  it('should get all products', async () => {
    const products = [
      {
        id: 1,
        name: 'Test Product',
        price: 100,
        status: true,
        image: 'image.jpg',
        productTypeId: 1,
        regionId: 1,
        description: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest.spyOn(getAllUseCase, 'execute').mockResolvedValue(products);

    const result = await controller.getAll();

    expect(result).toEqual({
      success: true,
      message: 'All products',
      data: products,
      code: 200,
    });
  });

  it('should get a product by id', async () => {
    const product = {
      id: 1,
      name: 'Test Product',
      price: 100,
      status: true,
      image: 'image.jpg',
      productTypeId: 1,
      regionId: 1,
      description: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(getByIdUseCase, 'execute').mockResolvedValue(product);

    const result = await controller.getById(1);

    expect(result).toEqual({
      success: true,
      message: 'Product with id 1 found',
      data: product,
      code: 200,
    });
    expect(getByIdUseCase.execute).toHaveBeenCalledWith(1);
  });

  it('should create a product successfully', async () => {
    const dto: CreateProductDto = {
      name: 'New Product',
      description: 'test',
      price: 100,
      product_type_id: 1,
      region_id: 1,
      status: true,
    };

    const mockFile = { filename: 'image.jpg' } as Express.Multer.File;

    const createdProduct = plainToInstance(Product, {
      id: 1,
      name: dto.name,
      description: dto.description,
      price: dto.price,
      productTypeId: dto.product_type_id,
      regionId: dto.region_id,
      image: mockFile.filename,
      status: dto.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    jest.spyOn(createUseCase, 'execute').mockResolvedValue(createdProduct);

    const result = await controller.create(dto, mockFile);

    expect(result).toEqual({
      success: true,
      message: 'Product created successfully',
      data: createdProduct,
      code: 200,
    });
  });

  it('should update a product successfully', async () => {
    const dto: UpdateProductDto = {
      name: 'Updated',
      description: 'Updated',
      price: 200,
      product_type_id: 1,
      region_id: 1,
      status: true,
      image: null, // ← sin el "?" innecesario
    };

    const file = { filename: 'updated.jpg' } as Express.Multer.File;

    const updatedProduct = {
      id: 1,
      name: dto.name,
      description: dto.description,
      price: dto.price,
      productTypeId: dto.product_type_id,
      regionId: dto.region_id,
      status: dto.status,
      image: file.filename,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(updateUseCase, 'execute').mockResolvedValue(updatedProduct);

    const result = await controller.update(1, dto, file);

    expect(result).toEqual({
      success: true,
      message: 'Product with id 1 updated',
      data: updatedProduct,
      code: 200,
    });
  });

  it('should delete uploaded file if create throws error', async () => {
    const dto: CreateProductDto = {
      name: 'Error Product',
      description: 'fail',
      price: 999,
      product_type_id: 1,
      region_id: 1,
    };

    const file = { filename: 'error.jpg' } as Express.Multer.File;

    jest
      .spyOn(createUseCase, 'execute')
      .mockRejectedValue(new Error('Create failed'));

    const unlinkSpy = jest
      .spyOn(fs, 'unlink')
      .mockImplementation((_, cb) => cb(null));

    await expect(controller.create(dto, file)).rejects.toThrow('Create failed');

    expect(unlinkSpy).toHaveBeenCalled();
  });
});
