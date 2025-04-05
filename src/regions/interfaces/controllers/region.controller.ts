import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRegionDto } from '../dto/create-region.dto';
import { CreateRegionUseCase } from 'src/regions/application/use-cases/create-region.use-case';
import { GetAllRegionsUseCase } from 'src/regions/application/use-cases/get-all-regions.use-case';
import { GetRegionByIdUseCase } from 'src/regions/application/use-cases/get-region-by-id-use-case';
import { buildResponse } from 'src/common/helpers/response.helper';

@Controller('regions')
export class RegionController {
  constructor(
    private readonly createRegionUseCase: CreateRegionUseCase,
    private readonly getAllRegionsUseCase: GetAllRegionsUseCase,
    private readonly getRegionByIdUseCase: GetRegionByIdUseCase,
  ) {}

  @Get()
  async getRegions() {
    const regions = await this.getAllRegionsUseCase.execute();
    return buildResponse(regions, 'All regions');
  }

  @Post()
  async create(@Body() data: CreateRegionDto) {
    const region = await this.createRegionUseCase.execute(data.name);
    return buildResponse(region, 'Region create successfully');
  }

  @Get('/:id')
  async getRegion(@Param('id', ParseIntPipe) id: number) {
    const region = await this.getRegionByIdUseCase.execute(id);
    return buildResponse(region, `Region with id ${id} found`);
  }
}
