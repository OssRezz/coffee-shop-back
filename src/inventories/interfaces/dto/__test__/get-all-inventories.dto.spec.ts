import 'reflect-metadata';
import { validate } from 'class-validator';
import { GetAllInventoriesDto } from '../get-all-inventories.dto';

describe('GetAllInventoriesDto', () => {
  it('should validate correctly with valid data', async () => {
    const dto = new GetAllInventoriesDto();
    dto.region = 1;
    dto.product_type = 2;

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No validation errors
  });

  it('should validate correctly with only region', async () => {
    const dto = new GetAllInventoriesDto();
    dto.region = 1;

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No validation errors
  });

  it('should validate correctly with only product_type', async () => {
    const dto = new GetAllInventoriesDto();
    dto.product_type = 2;

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No validation errors
  });

  it('should validate correctly with no filters', async () => {
    const dto = new GetAllInventoriesDto(); // No filters provided

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No validation errors
  });
});
