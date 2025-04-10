import { GetProductTypeByIdUseCase } from '../get-product-type-by-id.use-case';
import { ProductType } from 'src/product-types/domain/entities/product-type.entity';

describe('GetProductTypeByIdUseCase', () => {
  let useCase: GetProductTypeByIdUseCase;
  let productTypeRepository: any;

  beforeEach(() => {
    productTypeRepository = {
      getById: jest.fn(),
    };

    useCase = new GetProductTypeByIdUseCase(productTypeRepository);
  });

  it('should return a product type if found', async () => {
    const mockProductType: ProductType = { id: 1, name: 'Café' };

    productTypeRepository.getById.mockResolvedValue(mockProductType);

    const result = await useCase.execute(1);

    expect(result).toEqual(mockProductType);
    expect(productTypeRepository.getById).toHaveBeenCalledWith(1);
  });

  it('should return null if product type is not found', async () => {
    productTypeRepository.getById.mockResolvedValue(null);

    const result = await useCase.execute(99);

    expect(result).toBeNull();
    expect(productTypeRepository.getById).toHaveBeenCalledWith(99);
  });
});
