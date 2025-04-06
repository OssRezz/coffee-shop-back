import { Module } from '@nestjs/common';
import { WinstonLogger } from 'src/common/logger/winston-logger.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { ProductTypePrismaRepository } from 'src/product-types/infrastructure/prisma/product-type.prisma.repository';
import { RegionPrismaRepository } from 'src/regions/infrastructure/prisma/region.prisma.repository';
import { ProductPrismaRepository } from './infrastructure/prisma/product.prisma.repository';
import { ProductController } from './interfaces/controllers/product.controller';
import { GetAllProductsUseCase } from './application/use-cases/get-all-products.use-case';
import { UpdateProductUseCase } from './application/use-cases/updated-product.use-case';
import { GetProductByIdUseCase } from './application/use-cases/get-product-by-id.use-case';

@Module({
  controllers: [ProductController],
  providers: [
    WinstonLogger,
    PrismaService,
    CreateProductUseCase,
    GetAllProductsUseCase,
    UpdateProductUseCase,
    GetProductByIdUseCase,
    {
      provide: 'ProductRepository',
      useClass: ProductPrismaRepository,
    },
    {
      provide: 'ProductTypeRepository',
      useClass: ProductTypePrismaRepository,
    },
    {
      provide: 'RegionRepository',
      useClass: RegionPrismaRepository,
    },
  ],
  exports: [],
})
export class ProductModule {}
