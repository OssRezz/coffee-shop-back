import { GetAllRegionsUseCase } from '../get-all-regions.use-case';
import { Region } from 'src/regions/domain/entities/region.entity';

describe('GetAllRegionsUseCase', () => {
  let useCase: GetAllRegionsUseCase;
  let regionRepository: any;

  beforeEach(() => {
    regionRepository = {
      getAll: jest.fn(),
    };

    useCase = new GetAllRegionsUseCase(regionRepository);
  });

  it('should return a list of regions', async () => {
    const mockRegions: Region[] = [
      { id: 1, name: 'Antioquia' },
      { id: 2, name: 'Cundinamarca' },
    ];

    regionRepository.getAll.mockResolvedValue(mockRegions);

    const result = await useCase.execute();

    expect(result).toEqual(mockRegions);
    expect(regionRepository.getAll).toHaveBeenCalled();
  });

  it('should return an empty array if no regions are found', async () => {
    regionRepository.getAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(regionRepository.getAll).toHaveBeenCalled();
  });
});
