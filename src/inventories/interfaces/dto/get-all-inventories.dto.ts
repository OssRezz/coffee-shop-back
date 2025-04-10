import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export class GetAllInventoriesDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  region?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  product_type?: number;
}
