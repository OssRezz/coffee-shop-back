import 'reflect-metadata';
import { validate } from 'class-validator';
import { CreateProductTypeDto } from '../product-type.dto';

describe('CreateProductTypeDto', () => {
  it('should validate correctly with valid data', async () => {
    const dto = new CreateProductTypeDto();
    dto.name = 'Product Type 1';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail when name is empty', async () => {
    const dto = new CreateProductTypeDto();
    dto.name = '';

    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'name')).toBe(true);
  });

  it('should fail when name is not a string', async () => {
    const dto = new CreateProductTypeDto();
    dto.name = 123 as any; // Simulating a non-string value

    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'name')).toBe(true);
  });

  it('should pass when name is a non-empty string', async () => {
    const dto = new CreateProductTypeDto();
    dto.name = 'Valid Product Type';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
