import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class SaleDetailDto {
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
  address: string;

  @IsNotEmpty()
  @IsPositive()
  totalAmount: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleDetailDto)
  details: SaleDetailDto[];
}
