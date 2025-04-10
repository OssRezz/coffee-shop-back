import 'reflect-metadata';
import { validate } from 'class-validator';
import { GetAllInventoriesDto } from '../get-all-inventories.dto';

describe('GetAllInventoriesDto', () => {
  it('should validate correctly with valid data', async () => {
    const dto = new GetAllInventoriesDto();
    dto.region = 1;
    dto.product_type = 2;
    dto.page_length = 10;
    dto.page = 1;
    dto.cursor = 5;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail when page_length is not a number', async () => {
    const dto = new GetAllInventoriesDto();
    dto.page_length = NaN;

    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'page_length')).toBe(true);
  });

  it('should fail when page_length is negative', async () => {
    const dto = new GetAllInventoriesDto();
    dto.page_length = -1;

    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'page_length')).toBe(true);
  });

  it('should fail when page is less than 1', async () => {
    const dto = new GetAllInventoriesDto();
    dto.page = 0;

    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'page')).toBe(true);
  });

  it('should fail when cursor is not a number', async () => {
    const dto = new GetAllInventoriesDto();
    dto.cursor = NaN;

    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'cursor')).toBe(true);
  });

  it('should pass when optional fields are not provided', async () => {
    const dto = new GetAllInventoriesDto();
    dto.page_length = 10; // required field
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
