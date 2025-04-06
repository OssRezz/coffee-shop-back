import { Module } from '@nestjs/common';
import { ProductTypesController } from './interfaces/controllers/product-types.controller';
import { WinstonLogger } from 'src/common/logger/winston-logger.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductTypeUseCase } from './application/use-cases/create-product-type.use-case';
import { ProductTypePrismaRepository } from './infrastructure/prisma/product-type.prisma.repository';
import { GetAllProductTypeUseCase } from './application/use-cases/get-all-product-type.use-case';
import { GetProductTypeByIdUseCase } from './application/use-cases/get-product-type-by-id.use-case';

@Module({
  controllers: [ProductTypesController],
  providers: [
    WinstonLogger,
    PrismaService,
    CreateProductTypeUseCase,
    GetAllProductTypeUseCase,
    GetProductTypeByIdUseCase,
    {
      provide: 'ProductTypeRepository',
      useClass: ProductTypePrismaRepository,
    },
  ],
})
export class ProductTypeModule {}
