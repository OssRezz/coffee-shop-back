import { Injectable, Inject } from '@nestjs/common';
import { RegionRepository } from 'src/regions/domain/ports/region.repository';
import { Region } from 'src/regions/domain/entities/region.entity';

export class GetRegionByIdUseCase {
  constructor(
    @Inject('RegionRepository')
    private readonly regionRepository: RegionRepository,
  ) {}

  async execute(id: number): Promise<Region | null> {
    return this.regionRepository.getById(id);
  }
}
