import { IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEntryDto {
  @Type(() => Number)
  @IsNumber()
  productId: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  quantity: number;
}
