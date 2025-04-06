import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventoryRepository } from 'src/inventories/domain/ports/inventory.repository';
import { Inventory } from 'src/inventories/domain/entities/inventory.entity';
import { WinstonLogger } from 'src/common/logger/winston-logger.service';

@Injectable()
export class InventoryPrismaRepository implements InventoryRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: WinstonLogger,
  ) {}

  async findByProductId(productId: number): Promise<Inventory | null> {
    try {
      const inventory = await this.prisma.inventory.findUnique({
        where: { productId },
      });

      if (!inventory) {
        this.logger.warn(`No inventory found for product ID ${productId}`);
        return null;
      }

      return new Inventory(
        inventory.id,
        inventory.productId,
        inventory.quantity,
        inventory.createdAt,
        inventory.updatedAt,
      );
    } catch (error) {
      this.logger.error(
        `Error fetching inventory for product ${productId}`,
        error.stack,
      );
      throw new InternalServerErrorException('Error fetching inventory');
    }
  }

  async create(productId: number, quantity: number): Promise<Inventory> {
    try {
      const created = await this.prisma.inventory.create({
        data: {
          productId,
          quantity,
        },
      });

      return new Inventory(
        created.id,
        created.productId,
        created.quantity,
        created.createdAt,
        created.updatedAt,
      );
    } catch (error) {
      this.logger.error(
        `Error creating inventory for product ${productId}`,
        error.stack,
      );
      throw new InternalServerErrorException('Error creating inventory');
    }
  }

  async updateQuantity(
    productId: number,
    quantity: number,
  ): Promise<Inventory> {
    try {
      const updated = await this.prisma.inventory.update({
        where: { productId },
        data: { quantity },
      });

      return new Inventory(
        updated.id,
        updated.productId,
        updated.quantity,
        updated.createdAt,
        updated.updatedAt,
      );
    } catch (error) {
      this.logger.error(
        `Error updating inventory for product ${productId}`,
        error.stack,
      );
      throw new InternalServerErrorException('Error updating inventory');
    }
  }

  async getAvailableInventories({
    region,
    productType,
    pageLength,
    page,
    cursor,
  }: {
    region?: number;
    productType?: number;
    pageLength: number;
    page?: number;
    cursor?: number;
  }): Promise<any[]> {
    try {
      const where: any = {
        quantity: { gt: 0 },
        product: {
          ...(region && { regionId: region }),
          ...(productType && { productTypeId: productType }),
          status: true,
        },
      };

      const pagination: any = cursor
        ? {
            take: pageLength,
            skip: 1,
            cursor: { id: cursor },
          }
        : {
            take: pageLength,
            skip: page && page > 1 ? (page - 1) * pageLength : 0,
          };

      const results = await this.prisma.inventory.findMany({
        where,
        include: { product: true },
        orderBy: { id: 'asc' },
        ...pagination,
      });

      return results;
    } catch (error) {
      this.logger.error('Error retrieving available inventories', error.stack);
      throw new InternalServerErrorException(
        'Error retrieving available inventories',
      );
    }
  }
}
