import { GetAllInventoriesUseCase } from '../get-all-inventories.use-case';
import { InventoryRepository } from 'src/inventories/domain/ports/inventory.repository';

describe('GetAllInventoriesUseCase', () => {
  let useCase: GetAllInventoriesUseCase;
  let inventoryRepository: jest.Mocked<InventoryRepository>;

  beforeEach(() => {
    inventoryRepository = {
      getAvailableInventories: jest.fn(),
    } as any;

    useCase = new GetAllInventoriesUseCase(inventoryRepository);
  });

  it('should call repository with basic pagination', async () => {
    const dto = {
      page_length: 10,
      page: 1,
    };

    const expected = [{ product_id: 1, quantity: 5 }];
    inventoryRepository.getAvailableInventories.mockResolvedValue(expected);

    const result = await useCase.execute(dto);

    expect(inventoryRepository.getAvailableInventories).toHaveBeenCalledWith({
      region: undefined,
      productType: undefined,
      pageLength: 10,
      page: 1,
      cursor: undefined,
    });
    expect(result).toEqual(expected);
  });

  it('should call repository with filters and cursor pagination', async () => {
    const dto = {
      region: 2,
      product_type: 3,
      page_length: 5,
      cursor: 20,
    };

    const expected = [{ product_id: 2, quantity: 3 }];
    inventoryRepository.getAvailableInventories.mockResolvedValue(expected);

    const result = await useCase.execute(dto);

    expect(inventoryRepository.getAvailableInventories).toHaveBeenCalledWith({
      region: 2,
      productType: 3,
      pageLength: 5,
      page: undefined,
      cursor: 20,
    });
    expect(result).toEqual(expected);
  });

  it('should return empty array if no inventories found', async () => {
    const dto = { page_length: 10 };
    inventoryRepository.getAvailableInventories.mockResolvedValue([]);

    const result = await useCase.execute(dto);

    expect(result).toEqual([]);
  });
});
