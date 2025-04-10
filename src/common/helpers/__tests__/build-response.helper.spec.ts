import { buildResponse } from '../response.helper';
import { ApiResponse } from '../../interfaces/api-response.interface';

describe('buildResponse', () => {
  it('should build response with default message and code', () => {
    const data = { name: 'Coffee', price: 5000 };

    const result = buildResponse(data);

    const expected: ApiResponse<typeof data> = {
      success: true,
      message: 'Successful operation',
      data,
      code: 200,
    };

    expect(result).toEqual(expected);
  });

  it('should build response with custom message and code', () => {
    const data = { id: 1 };
    const message = 'Created successfully';
    const code = 201;

    const result = buildResponse(data, message, code);

    expect(result).toEqual({
      success: true,
      message,
      data,
      code,
    });
  });
});
