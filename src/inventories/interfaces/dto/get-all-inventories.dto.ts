import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsPositive, Min } from 'class-validator';

export class GetAllInventoriesDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  region?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  product_type?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  page_length: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  cursor?: number;
}
