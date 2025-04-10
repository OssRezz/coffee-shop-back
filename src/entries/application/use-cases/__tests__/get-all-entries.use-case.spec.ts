import { GetAllEntriesUseCase } from '../get-all-entries.use-case';
import { Entry } from 'src/entries/domain/entities/entry.entity';

describe('GetAllEntriesUseCase', () => {
  let useCase: GetAllEntriesUseCase;
  let entryRepository: any;

  beforeEach(() => {
    entryRepository = {
      getAll: jest.fn(),
    };

    useCase = new GetAllEntriesUseCase(entryRepository);
  });

  it('should return a list of entries', async () => {
    const mockEntries: Entry[] = [
      {
        id: 1,
        productId: 1,
        quantity: 10,
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
      },
      {
        id: 2,
        productId: 2,
        quantity: 5,
        createdAt: new Date('2023-01-02'),
        updatedAt: new Date('2023-01-02'),
      },
    ];

    entryRepository.getAll.mockResolvedValue(mockEntries);

    const result = await useCase.execute();

    expect(result).toEqual(mockEntries);
    expect(entryRepository.getAll).toHaveBeenCalled();
  });

  it('should return an empty array when there are no entries', async () => {
    entryRepository.getAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(entryRepository.getAll).toHaveBeenCalled();
  });
});
