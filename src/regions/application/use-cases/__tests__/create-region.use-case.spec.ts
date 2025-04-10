import { CreateRegionUseCase } from '../create-region.use-case';
import { Region } from 'src/regions/domain/entities/region.entity';

describe('CreateRegionUseCase', () => {
  let useCase: CreateRegionUseCase;
  let regionRepository: any;

  beforeEach(() => {
    regionRepository = {
      create: jest.fn(),
    };

    useCase = new CreateRegionUseCase(regionRepository);
  });

  it('should create a new region with the given name', async () => {
    const name = 'Antioquia';
    const mockRegion: Region = { id: 1, name };

    regionRepository.create.mockResolvedValue(mockRegion);

    const result = await useCase.execute(name);

    expect(result).toEqual(mockRegion);
    expect(regionRepository.create).toHaveBeenCalledWith(name);
  });
});
