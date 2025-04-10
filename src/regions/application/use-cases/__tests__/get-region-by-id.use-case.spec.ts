import { GetRegionByIdUseCase } from '../get-region-by-id-use-case';
import { Region } from 'src/regions/domain/entities/region.entity';

describe('GetRegionByIdUseCase', () => {
  let useCase: GetRegionByIdUseCase;
  let regionRepository: any;

  beforeEach(() => {
    regionRepository = {
      getById: jest.fn(),
    };

    useCase = new GetRegionByIdUseCase(regionRepository);
  });

  it('should return a region if found', async () => {
    const mockRegion: Region = { id: 1, name: 'Antioquia' };

    regionRepository.getById.mockResolvedValue(mockRegion);

    const result = await useCase.execute(1);

    expect(result).toEqual(mockRegion);
    expect(regionRepository.getById).toHaveBeenCalledWith(1);
  });

  it('should return null if region is not found', async () => {
    regionRepository.getById.mockResolvedValue(null);

    const result = await useCase.execute(99);

    expect(result).toBeNull();
    expect(regionRepository.getById).toHaveBeenCalledWith(99);
  });
});
