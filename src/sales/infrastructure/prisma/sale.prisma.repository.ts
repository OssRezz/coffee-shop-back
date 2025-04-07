import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SaleRepository } from 'src/sales/domain/ports/sale.repository';
import { Sale } from 'src/sales/domain/entities/sale.entity';
import { SaleDetail } from 'src/sales/domain/entities/sale-detail.entity';
import { Prisma } from '@prisma/client';
import { WinstonLogger } from 'src/common/logger/winston-logger.service';

@Injectable()
export class SalePrismaRepository implements SaleRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: WinstonLogger,
  ) {}

  async create(
    sale: Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>,
    details: Omit<SaleDetail, 'id'>[],
  ): Promise<Sale> {
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const created = await tx.sale.create({
          data: {
            transactionId: sale.transactionId,
            address: sale.address,
            totalAmount: new Prisma.Decimal(sale.totalAmount),
            status: sale.status,
            details: {
              create: details.map((d) => ({
                productId: d.productId,
                price: new Prisma.Decimal(d.price),
                quantity: d.quantity,
              })),
            },
          },
        });

        return created;
      });

      return new Sale(
        result.id,
        result.transactionId,
        result.address,
        result.totalAmount.toNumber(),
        result.status,
        result.createdAt,
        result.updatedAt,
      );
    } catch (error) {
      this.logger.error('Error creating sale', error.stack || error.message);
      throw new InternalServerErrorException('Error creating sale');
    }
  }
}
