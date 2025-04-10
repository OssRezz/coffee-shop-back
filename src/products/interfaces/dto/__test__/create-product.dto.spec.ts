import 'reflect-metadata';
import { validate } from 'class-validator';
import { CreateProductDto } from '../create-product.dto';
import { plainToClass } from 'class-transformer';

describe('CreateProductDto', () => {
  it('should pass validation when all fields are correct', async () => {
    const dto = new CreateProductDto();
    dto.name = 'Product 1';
    dto.region_id = 1;
    dto.product_type_id = 1;
    dto.description = 'Product description';
    dto.price = 100;
    dto.image = 'image.jpg';
    dto.status = true;

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No validation errors
  });

  it('should fail when required fields are missing', async () => {
    const dto = new CreateProductDto();
    dto.name = '';
    dto.region_id = 0;
    dto.product_type_id = 0;
    dto.description = '';
    dto.price = -1;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should trim spaces from name, description and image', async () => {
    const dto = plainToClass(CreateProductDto, {
      name: '  Product 1  ',
      description: '  Product description  ',
      image: '  image.jpg  ',
      region_id: 1,
      product_type_id: 1,
      price: 10,
    });

    const errors = await validate(dto);

    // Verifica los valores transformados
    expect(dto.name).toBe('Product 1');
    expect(dto.description).toBe('Product description');
    expect(dto.image).toBe('image.jpg');
    expect(errors.length).toBe(0); // No validation errors
  });

  it('should convert price to a positive number', async () => {
    const dto = new CreateProductDto();
    dto.name = 'Product 1';
    dto.region_id = 1;
    dto.product_type_id = 1;
    dto.description = 'Product description';
    dto.price = -100;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isPositive).toBeDefined();
  });

  it('should set optional status as undefined if not provided', async () => {
    const dto = new CreateProductDto();
    dto.name = 'Product 1';
    dto.region_id = 1;
    dto.product_type_id = 1;
    dto.description = 'Product description';
    dto.price = 100;

    const errors = await validate(dto);
    expect(dto.status).toBeUndefined();
    expect(errors.length).toBe(0); // No validation errors
  });
});
