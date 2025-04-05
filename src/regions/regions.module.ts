import { Module } from '@nestjs/common';
import { RegionController } from './interfaces/controllers/region.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRegionUseCase } from './application/use-cases/create-region.use-case';
import { RegionPrismaRepository } from './infrastructure/prisma/region.prisma.repository';
import { GetAllRegionsUseCase } from './application/use-cases/get-all-regions.use-case';
import { GetRegionByIdUseCase } from './application/use-cases/get-region-by-id-use-case';
import { WinstonLogger } from 'src/common/logger/winston-logger.service';

@Module({
  controllers: [RegionController],
  providers: [
    WinstonLogger,
    PrismaService,
    CreateRegionUseCase,
    GetAllRegionsUseCase,
    GetRegionByIdUseCase,
    {
      provide: 'RegionRepository',
      useClass: RegionPrismaRepository,
    },
  ],
})
export class RegionsModule {}
