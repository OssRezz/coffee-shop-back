import { Inject, Injectable } from '@nestjs/common';
import { RegionRepository } from 'src/regions/domain/ports/region.repository';
import { Region } from 'src/regions/domain/entities/region.entity';

@Injectable()
export class CreateRegionUseCase {
  constructor(
    @Inject('RegionRepository')
    private readonly regionRepository: RegionRepository,
  ) {}

  async execute(name: string): Promise<Region> {
    return this.regionRepository.create(name);
  }
}
