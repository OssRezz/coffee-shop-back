import 'reflect-metadata';
import { validate } from 'class-validator';
import { CreateCustomerDto } from '../create-customer.dto';
import { plainToClass } from 'class-transformer';

describe('CreateCustomerDto', () => {
  let dto: CreateCustomerDto;

  beforeEach(() => {
    dto = new CreateCustomerDto();
  });

  it('should be valid with correct fields', async () => {
    dto.documentNumber = '1234567890';
    dto.name = 'John Doe';
    dto.email = 'john.doe@example.com';
    dto.cellphone = '1234567890';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should return error if documentNumber is empty', async () => {
    dto.documentNumber = '';
    dto.name = 'John Doe';
    dto.email = 'john.doe@example.com';
    dto.cellphone = '1234567890';

    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'documentNumber')).toBe(true);
  });

  it('should return error if name is empty', async () => {
    dto.documentNumber = '1234567890';
    dto.name = '';
    dto.email = 'john.doe@example.com';
    dto.cellphone = '1234567890';

    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'name')).toBe(true);
  });

  it('should return error if email is not valid', async () => {
    dto.documentNumber = '1234567890';
    dto.name = 'John Doe';
    dto.email = 'invalid-email';
    dto.cellphone = '1234567890';

    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'email')).toBe(true);
  });

  it('should return error if cellphone is not a 10-digit number', async () => {
    dto.documentNumber = '1234567890';
    dto.name = 'John Doe';
    dto.email = 'john.doe@example.com';
    dto.cellphone = '12345';

    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'cellphone')).toBe(true);
  });

  it('should trim spaces from documentNumber, name, and email', async () => {
    const dto = plainToClass(CreateCustomerDto, {
      documentNumber: ' 1234567890 ',
      name: ' John Doe ',
      email: ' JOHN.DOE@EXAMPLE.COM ',
      cellphone: '1234567890',
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
    expect(dto.documentNumber).toBe('1234567890');
    expect(dto.name).toBe('John Doe');
    expect(dto.email).toBe('john.doe@example.com');
  });

  it('should convert email to lowercase', async () => {
    const dto = plainToClass(CreateCustomerDto, {
      documentNumber: '1234567890',
      name: 'John Doe',
      email: 'John.Doe@Example.Com',
      cellphone: '1234567890',
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
    expect(dto.email).toBe('john.doe@example.com');
  });
});
