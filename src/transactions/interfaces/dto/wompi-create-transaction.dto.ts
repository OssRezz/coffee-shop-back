import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEmail,
  IsPositive,
  Min,
  Max,
  MaxLength,
  Equals,
} from 'class-validator';

export class WompiCreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(150000)
  @Max(100_000_000_000_000)
  amountInCents: number;

  @IsNotEmpty()
  @IsString()
  @Equals('COP', { message: 'Currency must be COP' })
  currency: string;

  @IsNotEmpty()
  @IsEmail()
  customerEmail: string;

  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  acceptanceToken: string;

  @IsNotEmpty()
  @IsString()
  acceptPersonalAuth: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  installments: number;
}
