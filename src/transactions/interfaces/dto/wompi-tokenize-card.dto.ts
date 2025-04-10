import { IsNotEmpty, IsString, Length } from 'class-validator';

export class WompiTokenizeCardDto {
  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  @IsString()
  @Length(3, 4)
  @IsNotEmpty()
  cvc: string;

  @IsString()
  @IsNotEmpty()
  expMonth: string;

  @IsString()
  @IsNotEmpty()
  expYear: string;

  @IsString()
  @IsNotEmpty()
  cardHolder: string;
}
