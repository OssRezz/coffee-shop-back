import { GetProductByIdUseCase } from '../get-product-by-id.use-case';
import { Product } from 'src/products/domain/entities/product.entity';

describe('GetProductByIdUseCase', () => {
  let useCase: GetProductByIdUseCase;
  let productRepository: any;

  beforeEach(() => {
    productRepository = {
      getById: jest.fn(),
    };

    useCase = new GetProductByIdUseCase(productRepository);
  });

  it('should return a product if found', async () => {
    const mockProduct: Product = {
      id: 1,
      name: 'Café Tostado',
      productTypeId: 1,
      regionId: 1,
      description: 'Café de origen colombiano',
      price: 19.99,
      status: true,
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
      image: 'cafe.jpg',
    };

    productRepository.getById.mockResolvedValue(mockProduct);

    const result = await useCase.execute(1);

    expect(result).toEqual(mockProduct);
    expect(productRepository.getById).toHaveBeenCalledWith(1);
  });

  it('should return null if product is not found', async () => {
    productRepository.getById.mockResolvedValue(null);

    const result = await useCase.execute(999);

    expect(result).toBeNull();
    expect(productRepository.getById).toHaveBeenCalledWith(999);
  });
});
