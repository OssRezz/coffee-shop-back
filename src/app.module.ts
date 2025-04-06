import { Module } from '@nestjs/common';
import { RegionsModule } from './regions/regions.module';
import { WinstonLogger } from './common/logger/winston-logger.service';
import { ProductTypeModule } from './product-types/product-type.module';
import { ProductModule } from './products/product.module';
import { InventoryModule } from './inventories/inventory.module';
import { EntryModule } from './entries/entry.module';
import { CustomerModule } from './customers/customer.module';
import { TransactionModule } from './transactions/transaction.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RegionsModule,
    ProductTypeModule,
    ProductModule,
    InventoryModule,
    EntryModule,
    CustomerModule,
    TransactionModule,
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [WinstonLogger],
  exports: [WinstonLogger],
})
export class AppModule {}
