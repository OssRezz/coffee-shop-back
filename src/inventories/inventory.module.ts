import { Module } from '@nestjs/common';
import { InventoryController } from './interfaces/controllers/inventory.controller';
import { WinstonLogger } from 'src/common/logger/winston-logger.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllInventoriesUseCase } from './application/use-cases/get-all-inventories.use-case';
import { InventoryPrismaRepository } from './infrastructure/prisma/inventory.prisma.repository';
import { ProductPrismaRepository } from 'src/products/infrastructure/prisma/product.prisma.repository';
import { IncreaseInventoryUseCase } from './application/use-cases/increase-inventory.use-case';
import { DecreaseInventoryUseCase } from './application/use-cases/decrease-inventory.use-case';

@Module({
  controllers: [InventoryController],
  providers: [
    WinstonLogger,
    PrismaService,
    GetAllInventoriesUseCase,
    IncreaseInventoryUseCase,
    DecreaseInventoryUseCase,
    {
      provide: 'InventoryRepository',
      useClass: InventoryPrismaRepository,
    },
    {
      provide: 'ProductRepository',
      useClass: ProductPrismaRepository,
    },
  ],
  exports: [],
})
export class InventoryModule {}
