import { Module } from '@nestjs/common';
import { CustomerController } from './interfaces/controllers/customer.controller';
import { WinstonLogger } from 'src/common/logger/winston-logger.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllCustomersUseCase } from './application/use-cases/get-all-customers.use-case';
import { CustomerPrismaRepository } from './infrastructure/prisma/customer.prisma.repository';
import { CreateCustomerUseCase } from './application/use-cases/create-customer.use-case';
import { GetCustomerByDocumentUseCase } from './application/use-cases/get-customer-by-document.use-case';

@Module({
  controllers: [CustomerController],
  providers: [
    WinstonLogger,
    PrismaService,
    GetAllCustomersUseCase,
    CreateCustomerUseCase,
    GetCustomerByDocumentUseCase,
    {
      provide: 'CustomerRepository',
      useClass: CustomerPrismaRepository,
    },
  ],
  exports: [],
})
export class CustomerModule {}
