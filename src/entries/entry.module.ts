import { Module } from '@nestjs/common';
import { EntryController } from './interfaces/controllers/entry.controller';
import { WinstonLogger } from 'src/common/logger/winston-logger.service';
import { CreateEntryUseCase } from './application/use-cases/create-entry.use-case';
import { GetAllEntriesUseCase } from './application/use-cases/get-all-entries.use-case';
import { EntryPrismaRepository } from './infrastructure/prisma/entry.prisma.repository';
import { ProductPrismaRepository } from 'src/products/infrastructure/prisma/product.prisma.repository';
import { InventoryPrismaRepository } from 'src/inventories/infrastructure/prisma/inventory.prisma.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EntryController],
  providers: [
    WinstonLogger,
    PrismaService,
    CreateEntryUseCase,
    GetAllEntriesUseCase,
    {
      provide: 'EntryRepository',
      useClass: EntryPrismaRepository,
    },
    {
      provide: 'ProductRepository',
      useClass: ProductPrismaRepository,
    },
    {
      provide: 'InventoryRepository',
      useClass: InventoryPrismaRepository,
    },
  ],
  exports: [],
})
export class EntryModule {}
