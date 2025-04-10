import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CreateRegionDto } from '../create-region.dto';

describe('CreateRegionDto', () => {
  it('should trim spaces from name', async () => {
    const dto = plainToClass(CreateRegionDto, {
      name: '  North Region  ',
    });

    const errors = await validate(dto);

    // Verifica que el nombre ha sido transformado correctamente
    expect(dto.name).toBe('North Region');
    expect(errors.length).toBe(0); // No validation errors
  });

  it('should throw error if name is empty', async () => {
    const dto = plainToClass(CreateRegionDto, {
      name: '',
    });

    const errors = await validate(dto);

    // Verifica que se genera un error por campo vacío
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });
});
