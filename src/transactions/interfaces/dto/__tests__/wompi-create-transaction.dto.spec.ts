import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { WompiCreateTransactionDto } from '../wompi-create-transaction.dto';

describe('WompiCreateTransactionDto', () => {
  it('should validate all fields correctly', async () => {
    const dto = plainToClass(WompiCreateTransactionDto, {
      amountInCents: 1000000,
      currency: 'COP',
      customerEmail: 'customer@example.com',
      token: 'valid_token',
      acceptanceToken: 'valid_acceptance_token',
      acceptPersonalAuth: 'true',
      installments: 3,
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No validation errors
  });

  it('should throw error if any required field is missing or invalid', async () => {
    const dto = plainToClass(WompiCreateTransactionDto, {
      amountInCents: -5000, // Invalid amount
      currency: 'USD', // Invalid currency
      customerEmail: 'invalid-email', // Invalid email
      token: 'valid_token',
      acceptanceToken: 'valid_acceptance_token',
      acceptPersonalAuth: 'true',
      installments: 3,
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('should throw error if amountInCents is less than 150000', async () => {
    const dto = plainToClass(WompiCreateTransactionDto, {
      amountInCents: 100000, // Below minimum amount
      currency: 'COP',
      customerEmail: 'customer@example.com',
      token: 'valid_token',
      acceptanceToken: 'valid_acceptance_token',
      acceptPersonalAuth: 'true',
      installments: 3,
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('amountInCents');
  });

  it('should throw error if currency is not COP', async () => {
    const dto = plainToClass(WompiCreateTransactionDto, {
      amountInCents: 1000000,
      currency: 'USD', // Invalid currency
      customerEmail: 'customer@example.com',
      token: 'valid_token',
      acceptanceToken: 'valid_acceptance_token',
      acceptPersonalAuth: 'true',
      installments: 3,
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('currency');
  });

  it('should throw error if customerEmail is invalid', async () => {
    const dto = plainToClass(WompiCreateTransactionDto, {
      amountInCents: 1000000,
      currency: 'COP',
      customerEmail: 'invalid-email', // Invalid email
      token: 'valid_token',
      acceptanceToken: 'valid_acceptance_token',
      acceptPersonalAuth: 'true',
      installments: 3,
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('customerEmail');
  });

  it('should throw error if installments is not positive', async () => {
    const dto = plainToClass(WompiCreateTransactionDto, {
      amountInCents: 1000000,
      currency: 'COP',
      customerEmail: 'customer@example.com',
      token: 'valid_token',
      acceptanceToken: 'valid_acceptance_token',
      acceptPersonalAuth: 'true',
      installments: -1, // Invalid installments
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('installments');
  });
});
