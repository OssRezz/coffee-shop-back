import { IsString, Length } from 'class-validator';

export class WompiTokenizeCardDto {
  @IsString()
  cardNumber: string;

  @IsString()
  @Length(3, 4)
  cvc: string;

  @IsString()
  expMonth: string;

  @IsString()
  expYear: string;

  @IsString()
  cardHolder: string;
}
