import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegionRepository } from 'src/regions/domain/ports/region.repository';
import { Region } from 'src/regions/domain/entities/region.entity';
import { WinstonLogger } from 'src/common/logger/winston-logger.service';

@Injectable()
export class RegionPrismaRepository implements RegionRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: WinstonLogger,
  ) {}

  async create(name: string): Promise<Region> {
    try {
      const region = await this.prisma.region.create({
        data: { name },
      });
      return new Region(region.id, region.name);
    } catch (error) {
      this.logger.error('Error creating region', error.stack);
      throw new InternalServerErrorException('Error creating region');
    }
  }

  async getAll(): Promise<Region[]> {
    try {
      const regions = await this.prisma.region.findMany();
      return regions.map((region) => new Region(region.id, region.name));
    } catch (error) {
      this.logger.error('Error getting all regions', error.stack);
      throw new InternalServerErrorException('Error getting al regions');
    }
  }

  async getById(id: number): Promise<Region | null> {
    try {
      const region = await this.prisma.region.findUnique({ where: { id } });
      if (!region) {
        this.logger.warn(`Region with ID ${id} not found`);
        throw new NotFoundException(`Region with ID ${id} not found`);
      }
      return new Region(region.id, region.name);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Con esto no sobreescribimos el error en caso de ser NotFoundException
      }
      this.logger.error(`Error getting region ${id}`, error.stack);
      throw new InternalServerErrorException(`Error getting region ${id}`);
    }
  }
}
