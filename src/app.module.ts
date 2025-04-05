import { Module } from '@nestjs/common';
import { RegionsModule } from './regions/regions.module';
import { WinstonLogger } from './common/logger/winston-logger.service';
@Module({
  imports: [RegionsModule],
  controllers: [],
  providers: [WinstonLogger],
  exports: [WinstonLogger],
})
export class AppModule {}
