import { CreateProductTypeUseCase } from '../create-product-type.use-case';
import { ProductType } from 'src/product-types/domain/entities/product-type.entity';

describe('CreateProductTypeUseCase', () => {
  let useCase: CreateProductTypeUseCase;
  let productTypeRepository: any;

  beforeEach(() => {
    productTypeRepository = {
      create: jest.fn(),
    };

    useCase = new CreateProductTypeUseCase(productTypeRepository);
  });

  it('should create a new product type with the given name', async () => {
    const name = 'Café';
    const mockProductType: ProductType = { id: 1, name };

    productTypeRepository.create.mockResolvedValue(mockProductType);

    const result = await useCase.execute(name);

    expect(result).toEqual(mockProductType);
    expect(productTypeRepository.create).toHaveBeenCalledWith(name);
  });
});
