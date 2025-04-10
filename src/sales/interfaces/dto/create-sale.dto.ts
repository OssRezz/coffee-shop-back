import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class SaleDetailDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsPositive()
  quantity: number;
}

export class CreateSaleDto {
  @IsOptional()
  @IsNumber()
  transactionId?: number | null;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  address: string;

  @IsNotEmpty()
  @IsPositive()
  totalAmount: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleDetailDto)
  details: SaleDetailDto[];
}
