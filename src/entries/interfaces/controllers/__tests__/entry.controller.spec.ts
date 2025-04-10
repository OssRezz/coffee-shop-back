import { Test, TestingModule } from '@nestjs/testing';
import { EntryController } from '../entry.controller';
import { CreateEntryUseCase } from 'src/entries/application/use-cases/create-entry.use-case';
import { GetAllEntriesUseCase } from 'src/entries/application/use-cases/get-all-entries.use-case';

describe('EntryController', () => {
  let controller: EntryController;
  let createEntryUseCase: CreateEntryUseCase;
  let getAllEntriesUseCase: GetAllEntriesUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntryController],
      providers: [
        {
          provide: CreateEntryUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetAllEntriesUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get(EntryController);
    createEntryUseCase = module.get(CreateEntryUseCase);
    getAllEntriesUseCase = module.get(GetAllEntriesUseCase);
  });

  it('should return all entries', async () => {
    const entries = [
      {
        id: 1,
        productId: 1,
        quantity: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest.spyOn(getAllEntriesUseCase, 'execute').mockResolvedValue(entries);

    const result = await controller.getAllEntries();

    expect(result).toEqual({
      success: true,
      message: 'All entries',
      data: entries,
      code: 200,
    });
    expect(getAllEntriesUseCase.execute).toHaveBeenCalled();
  });

  it('should create a new entry', async () => {
    const dto = {
      productId: 1,
      quantity: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newEntry = { id: 1, ...dto };

    jest.spyOn(createEntryUseCase, 'execute').mockResolvedValue(newEntry);

    const result = await controller.createEntry(dto);

    expect(result).toEqual({
      success: true,
      message: 'Entry created successfully',
      data: newEntry,
      code: 200,
    });
    expect(createEntryUseCase.execute).toHaveBeenCalledWith(
      dto.productId,
      dto.quantity,
    );
  });
});
