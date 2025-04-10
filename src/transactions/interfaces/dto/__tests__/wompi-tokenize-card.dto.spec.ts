import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { WompiTokenizeCardDto } from '../wompi-tokenize-card.dto';

describe('WompiTokenizeCardDto', () => {
  it('should validate all fields correctly', async () => {
    const dto = plainToClass(WompiTokenizeCardDto, {
      cardNumber: '4111111111111111',
      cvc: '123',
      expMonth: '12',
      expYear: '25',
      cardHolder: 'John Doe',
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No validation errors
  });

  it('should throw error if any field is missing or invalid', async () => {
    const dto = plainToClass(WompiTokenizeCardDto, {
      cardNumber: '4111111111111111',
      cvc: '12', // Invalid CVC
      expMonth: '12',
      expYear: '25',
      cardHolder: 'John Doe',
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('cvc');
  });

  it('should throw error if cardNumber is empty', async () => {
    const dto = plainToClass(WompiTokenizeCardDto, {
      cardNumber: '', // Empty card number
      cvc: '123',
      expMonth: '12',
      expYear: '25',
      cardHolder: 'John Doe',
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('cardNumber');
  });

  it('should throw error if expMonth or expYear is empty', async () => {
    const dto = plainToClass(WompiTokenizeCardDto, {
      cardNumber: '4111111111111111',
      cvc: '123',
      expMonth: '', // Empty expMonth
      expYear: '25',
      cardHolder: 'John Doe',
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('expMonth');
  });

  it('should throw error if cardHolder is empty', async () => {
    const dto = plainToClass(WompiTokenizeCardDto, {
      cardNumber: '4111111111111111',
      cvc: '123',
      expMonth: '12',
      expYear: '25',
      cardHolder: '', // Empty cardHolder
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('cardHolder');
  });
});
