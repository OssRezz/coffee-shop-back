import {
  IsString,
  IsEmail,
  IsNumber,
  IsPositive,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CardDataDto {
  @IsString()
  cardNumber: string;

  @IsString()
  cvc: string;

  @IsString()
  expMonth: string;

  @IsString()
  expYear: string;

  @IsString()
  cardHolder: string;
}

class CustomerDataDto {
  @IsString()
  documentNumber: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  cellphone: string;

  @IsString()
  address: string;
}

class ProductDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;
}

export class CreateTransactionDto {
  @ValidateNested()
  @Type(() => CustomerDataDto)
  customer: CustomerDataDto;

  @ValidateNested()
  @Type(() => CardDataDto)
  card: CardDataDto;

  @IsNumber()
  @IsPositive()
  amountInCents: number;

  @IsString()
  currency: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];

  @IsNumber()
  installments: number;
}
