import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail, Matches } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  documentNumber: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value?.trim().toLowerCase())
  email: string;

  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @Matches(/^[0-9]{10}$/, {
    message: 'Cellphone must be a 10-digit number',
  })
  cellphone: string;
}
