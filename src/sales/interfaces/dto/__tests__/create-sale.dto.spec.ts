import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CreateSaleDto, SaleDetailDto } from '../create-sale.dto';

describe('CreateSaleDto', () => {
  it('should trim spaces from address', async () => {
    const dto = plainToClass(CreateSaleDto, {
      address: '  123 Main Street  ',
      totalAmount: 100,
      details: [{ productId: 1, price: 50, quantity: 2 }],
    });

    const errors = await validate(dto);

    // Verifica que el address ha sido transformado correctamente
    expect(dto.address).toBe('123 Main Street');
    expect(errors.length).toBe(0); // No validation errors
  });

  it('should throw error if address is empty', async () => {
    const dto = plainToClass(CreateSaleDto, {
      address: '',
      totalAmount: 100,
      details: [{ productId: 1, price: 50, quantity: 2 }],
    });

    const errors = await validate(dto);

    // Verifica que se genera un error por campo vacío
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('address');
  });

  it('should throw error if totalAmount is zero or negative', async () => {
    const dto = plainToClass(CreateSaleDto, {
      address: '123 Main Street',
      totalAmount: -100,
      details: [{ productId: 1, price: 50, quantity: 2 }],
    });

    const errors = await validate(dto);

    // Verifica que se genera un error por totalAmount negativo
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('totalAmount');
  });

  it('should validate SaleDetailDto correctly', async () => {
    const dto = plainToClass(CreateSaleDto, {
      address: '123 Main Street',
      totalAmount: 100,
      details: [{ productId: 1, price: 50, quantity: 2 }],
    });

    const errors = await validate(dto);

    // Verifica que los detalles de la venta (SaleDetailDto) son válidos
    expect(errors.length).toBe(0); // No validation errors
  });

  it('should throw error if details are missing or invalid', async () => {
    const dto = plainToClass(CreateSaleDto, {
      address: '123 Main Street',
      totalAmount: 100,
      details: [
        { productId: 1, price: -50, quantity: -2 }, // Invalid price and quantity
      ],
    });

    const errors = await validate(dto);

    // Verifica que se genera un error por los valores inválidos en los detalles de la venta
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('details');
  });
});
