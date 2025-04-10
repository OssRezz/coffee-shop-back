import {
  IsString,
  IsNumber,
  IsBoolean,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Transform } from 'class-transformer';

export class UpdateProductDto {
  @IsString()
  @Transform(({ value }) => value?.trim()) // Añadido para recortar espacios
  name: string;

  @Type(() => Number)
  @IsNumber()
  region_id: number;

  @Type(() => Number)
  @IsNumber()
  product_type_id: number;

  @IsString()
  @Transform(({ value }) => value?.trim()) // Añadido para recortar espacios
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
  @Transform(({ value }) => value?.trim()) // Añadido para recortar espacios
  image?: string | null;
}
