import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim()) // Añadido para recortar espacios
  name: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  region_id: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  product_type_id: number;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim()) // Añadido para recortar espacios
  description: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim()) // Añadido para recortar espacios
  image?: string | null;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  status?: boolean;
}
