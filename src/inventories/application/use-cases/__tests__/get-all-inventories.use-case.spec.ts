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

  it('should call repository with both filters', async () => {
    const dto = {
      region: 2,
      product_type: 3,
    };

    const expected = [{ product_id: 2, quantity: 3 }];
    inventoryRepository.getAvailableInventories.mockResolvedValue(expected);

    const result = await useCase.execute(dto);

    expect(inventoryRepository.getAvailableInventories).toHaveBeenCalledWith({
      region: 2,
      productType: 3,
    });
    expect(result).toEqual(expected);
  });

  it('should call repository with only region filter', async () => {
    const dto = {
      region: 2,
    };

    const expected = [{ product_id: 2, quantity: 3 }];
    inventoryRepository.getAvailableInventories.mockResolvedValue(expected);

    const result = await useCase.execute(dto);

    expect(inventoryRepository.getAvailableInventories).toHaveBeenCalledWith({
      region: 2,
      productType: undefined, // No productType is passed
    });
    expect(result).toEqual(expected);
  });

  it('should call repository with only product_type filter', async () => {
    const dto = {
      product_type: 3,
    };

    const expected = [{ product_id: 2, quantity: 3 }];
    inventoryRepository.getAvailableInventories.mockResolvedValue(expected);

    const result = await useCase.execute(dto);

    expect(inventoryRepository.getAvailableInventories).toHaveBeenCalledWith({
      region: undefined, // No region is passed
      productType: 3,
    });
    expect(result).toEqual(expected);
  });

  it('should call repository with no filters', async () => {
    const dto = {}; // No filters

    const expected = [{ product_id: 2, quantity: 3 }];
    inventoryRepository.getAvailableInventories.mockResolvedValue(expected);

    const result = await useCase.execute(dto);

    expect(inventoryRepository.getAvailableInventories).toHaveBeenCalledWith({
      region: undefined,
      productType: undefined,
    });
    expect(result).toEqual(expected);
  });
});
