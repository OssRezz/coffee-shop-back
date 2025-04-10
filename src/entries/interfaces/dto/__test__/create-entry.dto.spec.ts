import 'reflect-metadata';
import { validate } from 'class-validator';
import { CreateEntryDto } from '../create-entry.dto';

describe('CreateEntryDto', () => {
  it('should validate correctly with valid data', async () => {
    const dto = new CreateEntryDto();
    dto.productId = 1;
    dto.quantity = 10;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail when productId is not a number', async () => {
    const dto = new CreateEntryDto();
    dto.productId = NaN;
    dto.quantity = 10;

    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'productId')).toBe(true);
  });

  it('should fail when quantity is not a positive number', async () => {
    const dto = new CreateEntryDto();
    dto.productId = 1;
    dto.quantity = -5;

    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'quantity')).toBe(true);
  });

  it('should fail when quantity is zero', async () => {
    const dto = new CreateEntryDto();
    dto.productId = 1;
    dto.quantity = 0;

    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'quantity')).toBe(true);
  });
});
