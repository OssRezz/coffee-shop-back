import { Test, TestingModule } from '@nestjs/testing';
import { RegionController } from '../region.controller';
import { CreateRegionUseCase } from 'src/regions/application/use-cases/create-region.use-case';
import { GetAllRegionsUseCase } from 'src/regions/application/use-cases/get-all-regions.use-case';
import { GetRegionByIdUseCase } from 'src/regions/application/use-cases/get-region-by-id-use-case';

describe('RegionController', () => {
  let controller: RegionController;
  let createUseCase: CreateRegionUseCase;
  let getAllUseCase: GetAllRegionsUseCase;
  let getByIdUseCase: GetRegionByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegionController],
      providers: [
        {
          provide: CreateRegionUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetAllRegionsUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetRegionByIdUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get(RegionController);
    createUseCase = module.get(CreateRegionUseCase);
    getAllUseCase = module.get(GetAllRegionsUseCase);
    getByIdUseCase = module.get(GetRegionByIdUseCase);
  });

  it('should get all regions', async () => {
    const regions = [{ id: 1, name: 'Centro' }];
    jest.spyOn(getAllUseCase, 'execute').mockResolvedValue(regions);

    const result = await controller.getRegions();

    expect(result).toEqual({
      success: true,
      message: 'All regions',
      data: regions,
      code: 200,
    });
    expect(getAllUseCase.execute).toHaveBeenCalled();
  });

  it('should create a region', async () => {
    const dto = { name: 'Sur' };
    const region = { id: 1, name: 'Sur' };

    jest.spyOn(createUseCase, 'execute').mockResolvedValue(region);

    const result = await controller.create(dto);

    expect(result).toEqual({
      success: true,
      message: 'Region create successfully',
      data: region,
      code: 200,
    });
    expect(createUseCase.execute).toHaveBeenCalledWith(dto.name);
  });

  it('should get a region by id', async () => {
    const region = { id: 2, name: 'Norte' };
    jest.spyOn(getByIdUseCase, 'execute').mockResolvedValue(region);

    const result = await controller.getRegion(2);

    expect(result).toEqual({
      success: true,
      message: 'Region with id 2 found',
      data: region,
      code: 200,
    });
    expect(getByIdUseCase.execute).toHaveBeenCalledWith(2);
  });
});
