import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from '../inventory.controller';
import { GetAllInventoriesUseCase } from 'src/inventories/application/use-cases/get-all-inventories.use-case';
import { IncreaseInventoryUseCase } from 'src/inventories/application/use-cases/increase-inventory.use-case';
import { DecreaseInventoryUseCase } from 'src/inventories/application/use-cases/decrease-inventory.use-case';

describe('InventoryController', () => {
  let controller: InventoryController;
  let getAllInventoriesUseCase: GetAllInventoriesUseCase;
  let increaseInventoryUseCase: IncreaseInventoryUseCase;
  let decreaseInventoryUseCase: DecreaseInventoryUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [
        {
          provide: GetAllInventoriesUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: IncreaseInventoryUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DecreaseInventoryUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get(InventoryController);
    getAllInventoriesUseCase = module.get(GetAllInventoriesUseCase);
    increaseInventoryUseCase = module.get(IncreaseInventoryUseCase);
    decreaseInventoryUseCase = module.get(DecreaseInventoryUseCase);
  });

  it('should get all inventories with filters', async () => {
    const query = { region: 1, product_type: 2, page_length: 10 };
    const resultMock = [{ id: 1, quantity: 10 }];

    jest
      .spyOn(getAllInventoriesUseCase, 'execute')
      .mockResolvedValue(resultMock);

    const result = await controller.getAllInventories(query);

    expect(result).toEqual({
      success: true,
      message: 'All inventories',
      data: resultMock,
      code: 200,
    });
    expect(getAllInventoriesUseCase.execute).toHaveBeenCalledWith(query);
  });

  it('should increase inventory for a product', async () => {
    const dto = { productId: 1, quantity: 5 };
    const updatedInventory = {
      id: 1,
      quantity: 15,
      productId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(increaseInventoryUseCase, 'execute')
      .mockResolvedValue(updatedInventory);

    const result = await controller.increaseInventory(dto);

    expect(result).toEqual({
      success: true,
      message: 'Inventory successfully increased',
      data: updatedInventory,
      code: 200,
    });
    expect(increaseInventoryUseCase.execute).toHaveBeenCalledWith(
      dto.productId,
      dto.quantity,
    );
  });

  it('should decrease inventory for a product', async () => {
    const dto = { productId: 1, quantity: 2 };
    const updatedInventory = {
      id: 1,
      quantity: 8,
      productId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(decreaseInventoryUseCase, 'execute')
      .mockResolvedValue(updatedInventory);

    const result = await controller.decreaseInventory(dto);

    expect(result).toEqual({
      success: true,
      message: 'Inventory successfully decreased',
      data: updatedInventory,
      code: 200,
    });
    expect(decreaseInventoryUseCase.execute).toHaveBeenCalledWith(
      dto.productId,
      dto.quantity,
    );
  });
});
