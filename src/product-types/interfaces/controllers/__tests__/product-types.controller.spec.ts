import { Test, TestingModule } from '@nestjs/testing';
import { ProductTypesController } from '../product-types.controller';
import { CreateProductTypeUseCase } from 'src/product-types/application/use-cases/create-product-type.use-case';
import { GetAllProductTypeUseCase } from 'src/product-types/application/use-cases/get-all-product-type.use-case';
import { GetProductTypeByIdUseCase } from 'src/product-types/application/use-cases/get-product-type-by-id.use-case';

describe('ProductTypesController', () => {
  let controller: ProductTypesController;
  let createUseCase: CreateProductTypeUseCase;
  let getAllUseCase: GetAllProductTypeUseCase;
  let getByIdUseCase: GetProductTypeByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductTypesController],
      providers: [
        {
          provide: CreateProductTypeUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetAllProductTypeUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetProductTypeByIdUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get(ProductTypesController);
    createUseCase = module.get(CreateProductTypeUseCase);
    getAllUseCase = module.get(GetAllProductTypeUseCase);
    getByIdUseCase = module.get(GetProductTypeByIdUseCase);
  });

  it('should get all product types', async () => {
    const productTypes = [{ id: 1, name: 'Café' }];
    jest.spyOn(getAllUseCase, 'execute').mockResolvedValue(productTypes);

    const result = await controller.getProductTypes();

    expect(result).toEqual({
      success: true,
      message: 'All product types',
      data: productTypes,
      code: 200,
    });
    expect(getAllUseCase.execute).toHaveBeenCalled();
  });

  it('should create a product type', async () => {
    const dto = { name: 'Bebidas' };
    const newProductType = { id: 1, name: dto.name };

    jest.spyOn(createUseCase, 'execute').mockResolvedValue(newProductType);

    const result = await controller.create(dto);

    expect(result).toEqual({
      success: true,
      message: 'Product type created successfully',
      data: newProductType,
      code: 200,
    });
    expect(createUseCase.execute).toHaveBeenCalledWith(dto.name);
  });

  it('should get a product type by id', async () => {
    const id = 1;
    const productType = { id, name: 'Snacks' };

    jest.spyOn(getByIdUseCase, 'execute').mockResolvedValue(productType);

    const result = await controller.getProductType(id);

    expect(result).toEqual({
      success: true,
      message: `Product type with id ${id} found`,
      data: productType,
      code: 200,
    });
    expect(getByIdUseCase.execute).toHaveBeenCalledWith(id);
  });
});
