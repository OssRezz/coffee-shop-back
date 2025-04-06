import {
  IsString,
  IsNumber,
  IsBoolean,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto {
  @IsString()
  name: string;

  @Type(() => Number)
  @IsNumber()
  region_id: number;

  @Type(() => Number)
  @IsNumber()
  product_type_id: number;

  @IsString()
  description: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number;

  @IsBoolean()
  @Type(() => Boolean)
  status: boolean;

  @IsOptional()
  @IsString()
  image?: string | null;
}
