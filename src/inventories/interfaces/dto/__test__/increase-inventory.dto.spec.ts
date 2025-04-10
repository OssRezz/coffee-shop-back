import 'reflect-metadata';
import { validate } from 'class-validator';
import { IncreaseInventoryDto } from '../increase-inventory.dto';

describe('IncreaseInventoryDto', () => {
  it('should validate correctly with valid data', async () => {
    const dto = new IncreaseInventoryDto();
    dto.productId = 1;
    dto.quantity = 10;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail when productId is not a number', async () => {
    const dto = new IncreaseInventoryDto();
    dto.productId = NaN;
    dto.quantity = 10;

    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'productId')).toBe(true);
  });

  it('should fail when quantity is not a number', async () => {
    const dto = new IncreaseInventoryDto();
    dto.productId = 1;
    dto.quantity = NaN;

    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'quantity')).toBe(true);
  });

  it('should fail when quantity is negative', async () => {
    const dto = new IncreaseInventoryDto();
    dto.productId = 1;
    dto.quantity = -10;

    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'quantity')).toBe(true);
  });

  it('should fail when quantity is zero', async () => {
    const dto = new IncreaseInventoryDto();
    dto.productId = 1;
    dto.quantity = 0;

    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'quantity')).toBe(true);
  });

  it('should pass when all fields are correctly set', async () => {
    const dto = new IncreaseInventoryDto();
    dto.productId = 1;
    dto.quantity = 10;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
