import 'reflect-metadata';
import { validate } from 'class-validator';
import { UpdateProductDto } from '../update-product.dto';
import { plainToClass } from 'class-transformer';

describe('UpdateProductDto', () => {
  it('should pass validation when all fields are correct', async () => {
    const dto = new UpdateProductDto();
    dto.name = 'Updated Product';
    dto.region_id = 1;
    dto.product_type_id = 1;
    dto.description = 'Updated product description';
    dto.price = 200;
    dto.status = true;
    dto.image = 'updated_image.jpg';

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No validation errors
  });

  it('should fail validation if required fields are missing', async () => {
    const dto = new UpdateProductDto();
    dto.name = '';
    dto.region_id = 0;
    dto.product_type_id = 0;
    dto.description = '';
    dto.price = -1;
    dto.status = true;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should trim spaces from name, description, and image', async () => {
    const dto = plainToClass(UpdateProductDto, {
      name: '  Updated Product  ',
      description: '  Updated product description  ',
      image: '  updated_image.jpg  ',
      region_id: 1,
      product_type_id: 1,
      price: 10,
      status: true,
    });

    const errors = await validate(dto);

    // Verifica los valores transformados
    expect(dto.name).toBe('Updated Product');
    expect(dto.description).toBe('Updated product description');
    expect(dto.image).toBe('updated_image.jpg');
    expect(errors.length).toBe(0); // No validation errors
  });

  it('should convert price to a positive number', async () => {
    const dto = new UpdateProductDto();
    dto.name = 'Updated Product';
    dto.region_id = 1;
    dto.product_type_id = 1;
    dto.description = 'Updated product description';
    dto.price = -200;
    dto.status = true;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isPositive).toBeDefined();
  });

  it('should allow optional image to be null or undefined', async () => {
    const dto = new UpdateProductDto();
    dto.name = 'Updated Product';
    dto.region_id = 1;
    dto.product_type_id = 1;
    dto.description = 'Updated product description';
    dto.price = 200;
    dto.status = true;
    dto.image = null; // Testing null value

    const errors = await validate(dto);
    expect(dto.image).toBeNull();
    expect(errors.length).toBe(0); // No validation errors

    dto.image = undefined; // Testing undefined value

    const errorsUndefined = await validate(dto);
    expect(dto.image).toBeUndefined();
    expect(errorsUndefined.length).toBe(0); // No validation errors
  });
});
