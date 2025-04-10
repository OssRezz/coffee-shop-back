import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CreateTransactionDto } from '../create-transaction.dto';

describe('CreateTransactionDto', () => {
  it('should validate all fields correctly', async () => {
    const dto = plainToClass(CreateTransactionDto, {
      customer: {
        documentNumber: '1234567890',
        name: 'John Doe',
        email: 'john.doe@example.com',
        cellphone: '1234567890',
        address: '123 Main St',
      },
      card: {
        cardNumber: '4111111111111111',
        cvc: '123',
        expMonth: '12',
        expYear: '25',
        cardHolder: 'John Doe',
      },
      amountInCents: 10000,
      currency: 'USD',
      products: [{ productId: 1, quantity: 2, price: 5000 }],
      installments: 1,
    });

    const errors = await validate(dto);

    expect(errors.length).toBe(0); // No validation errors
  });

  it('should throw error if any required field is missing or invalid', async () => {
    const dto = plainToClass(CreateTransactionDto, {
      customer: {
        documentNumber: '1234567890',
        name: 'John Doe',
        email: 'invalid-email', // Invalid email
        cellphone: '1234567890',
        address: '123 Main St',
      },
      card: {
        cardNumber: '4111111111111111',
        cvc: '123',
        expMonth: '12',
        expYear: '25',
        cardHolder: 'John Doe',
      },
      amountInCents: 10000,
      currency: 'USD',
      products: [
        { productId: 1, quantity: -2, price: 5000 }, // Invalid quantity
      ],
      installments: 1,
    });

    const errors = await validate(dto);

    // Verifica que los errores se generan
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should throw error if amountInCents is not positive', async () => {
    const dto = plainToClass(CreateTransactionDto, {
      customer: {
        documentNumber: '1234567890',
        name: 'John Doe',
        email: 'john.doe@example.com',
        cellphone: '1234567890',
        address: '123 Main St',
      },
      card: {
        cardNumber: '4111111111111111',
        cvc: '123',
        expMonth: '12',
        expYear: '25',
        cardHolder: 'John Doe',
      },
      amountInCents: -10000, // Invalid amountInCents
      currency: 'USD',
      products: [{ productId: 1, quantity: 2, price: 5000 }],
      installments: 1,
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('amountInCents');
  });

  it('should validate the product array', async () => {
    const dto = plainToClass(CreateTransactionDto, {
      customer: {
        documentNumber: '1234567890',
        name: 'John Doe',
        email: 'john.doe@example.com',
        cellphone: '1234567890',
        address: '123 Main St',
      },
      card: {
        cardNumber: '4111111111111111',
        cvc: '123',
        expMonth: '12',
        expYear: '25',
        cardHolder: 'John Doe',
      },
      amountInCents: 10000,
      currency: 'USD',
      products: [{ productId: 1, quantity: 2, price: 5000 }],
      installments: 1,
    });

    const errors = await validate(dto);

    expect(errors.length).toBe(0); // No validation errors
  });

  it('should throw error if any product is invalid', async () => {
    const dto = plainToClass(CreateTransactionDto, {
      customer: {
        documentNumber: '1234567890',
        name: 'John Doe',
        email: 'john.doe@example.com',
        cellphone: '1234567890',
        address: '123 Main St',
      },
      card: {
        cardNumber: '4111111111111111',
        cvc: '123',
        expMonth: '12',
        expYear: '25',
        cardHolder: 'John Doe',
      },
      amountInCents: 10000,
      currency: 'USD',
      products: [
        { productId: 1, quantity: -2, price: 5000 }, // Invalid quantity
      ],
      installments: 1,
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('products');
  });
});
