import { Module } from '@nestjs/common';
import { SaleController } from './interfaces/controllers/sale.controller';
import { CreateSaleUseCase } from './application/use-cases/create-sale.use-case';
import { SalePrismaRepository } from './infrastructure/prisma/sale.prisma.repository';
import { InventoryPrismaRepository } from 'src/inventories/infrastructure/prisma/inventory.prisma.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { WinstonLogger } from 'src/common/logger/winston-logger.service';

@Module({
  controllers: [SaleController],
  providers: [
    WinstonLogger,
    PrismaService,
    CreateSaleUseCase,
    PrismaService,
    {
      provide: 'SaleRepository',
      useClass: SalePrismaRepository,
    },
    {
      provide: 'InventoryRepository',
      useClass: InventoryPrismaRepository,
    },
  ],
  exports: ['SaleRepository'],
})
export class SaleModule {}
