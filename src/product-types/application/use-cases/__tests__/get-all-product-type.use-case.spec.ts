import { GetAllProductTypeUseCase } from '../get-all-product-type.use-case';
import { ProductType } from 'src/product-types/domain/entities/product-type.entity';

describe('GetAllProductTypeUseCase', () => {
  let useCase: GetAllProductTypeUseCase;
  let productTypeRepository: any;

  beforeEach(() => {
    productTypeRepository = {
      getAll: jest.fn(),
    };

    useCase = new GetAllProductTypeUseCase(productTypeRepository);
  });

  it('should return a list of product types', async () => {
    const mockProductTypes: ProductType[] = [
      { id: 1, name: 'Café' },
      { id: 2, name: 'Té' },
    ];

    productTypeRepository.getAll.mockResolvedValue(mockProductTypes);

    const result = await useCase.execute();

    expect(result).toEqual(mockProductTypes);
    expect(productTypeRepository.getAll).toHaveBeenCalled();
  });

  it('should return an empty array if no product types found', async () => {
    productTypeRepository.getAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(productTypeRepository.getAll).toHaveBeenCalled();
  });
});
