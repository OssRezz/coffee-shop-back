import { Injectable, Inject } from '@nestjs/common';
import { RegionRepository } from 'src/regions/domain/ports/region.repository';
import { Region } from 'src/regions/domain/entities/region.entity';

export class GetAllRegionsUseCase {
  constructor(
    @Inject('RegionRepository')
    private readonly regionRepository: RegionRepository,
  ) {}

  async execute(): Promise<Region[]> {
    return this.regionRepository.getAll();
  }
}
