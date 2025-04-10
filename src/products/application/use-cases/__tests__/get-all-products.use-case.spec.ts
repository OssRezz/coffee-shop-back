import { GetAllProductsUseCase } from '../get-all-products.use-case';
import { Product } from 'src/products/domain/entities/product.entity';

describe('GetAllProductsUseCase', () => {
  let useCase: GetAllProductsUseCase;
  let productRepository: any;

  beforeEach(() => {
    productRepository = {
      getAll: jest.fn(),
    };

    useCase = new GetAllProductsUseCase(productRepository);
  });

  it('should return a list of products', async () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Café de Colombia',
        productTypeId: 1,
        regionId: 2,
        description: 'Café suave y aromático',
        price: 23.5,
        status: true,
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
        image: 'cafe.jpg',
      },
    ];

    productRepository.getAll.mockResolvedValue(mockProducts);

    const result = await useCase.execute();

    expect(result).toEqual(mockProducts);
    expect(productRepository.getAll).toHaveBeenCalled();
  });

  it('should return an empty array when there are no products', async () => {
    productRepository.getAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(productRepository.getAll).toHaveBeenCalled();
  });
});
