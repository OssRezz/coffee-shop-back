import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntryRepository } from 'src/entries/domain/ports/entry.repository';
import { Entry } from 'src/entries/domain/entities/entry.entity';
import { WinstonLogger } from 'src/common/logger/winston-logger.service';

@Injectable()
export class EntryPrismaRepository implements EntryRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: WinstonLogger,
  ) {}

  async getAll(): Promise<Entry[]> {
    try {
      const entries = await this.prisma.entry.findMany({
        include: { product: true },
        orderBy: { createdAt: 'desc' },
      });

      return entries.map((e) => ({
        id: e.id,
        productId: e.productId,
        quantity: e.quantity,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
        product: {
          id: e.product.id,
          name: e.product.name,
          description: e.product.description,
          price: e.product.price.toNumber(),
          image: e.product.image,
          status: e.product.status,
          createdAt: e.product.createdAt,
          updatedAt: e.product.updatedAt,
        },
      }));
    } catch (error) {
      this.logger.error('Error fetching entries', error.stack);
      throw new InternalServerErrorException('Error fetching entries');
    }
  }

  async create(productId: number, quantity: number): Promise<Entry> {
    try {
      const created = await this.prisma.entry.create({
        data: {
          productId,
          quantity,
        },
      });

      return new Entry(
        created.id,
        created.productId,
        created.quantity,
        created.createdAt,
        created.updatedAt,
      );
    } catch (error) {
      this.logger.error('Error creating entry', error.stack);
      throw new InternalServerErrorException('Error creating entry');
    }
  }
}
