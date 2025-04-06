import { Module } from '@nestjs/common';
import { RegionsModule } from './regions/regions.module';
import { WinstonLogger } from './common/logger/winston-logger.service';
import { ProductTypeModule } from './product-types/product-type.module';
import { ProductModule } from './products/product.module';
import { InventoryModule } from './inventories/inventory.module';
import { EntryModule } from './entries/entry.module';
import { CustomerModule } from './customers/customer.module';

@Module({
  imports: [
    RegionsModule,
    ProductTypeModule,
    ProductModule,
    InventoryModule,
    EntryModule,
    CustomerModule,
  ],
  controllers: [],
  providers: [WinstonLogger],
  exports: [WinstonLogger],
})
export class AppModule {}
