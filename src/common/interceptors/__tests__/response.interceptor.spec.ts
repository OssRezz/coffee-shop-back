import { ResponseInterceptor } from '../response.interceptor';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';

describe('ResponseInterceptor', () => {
  let interceptor: ResponseInterceptor;

  beforeEach(() => {
    interceptor = new ResponseInterceptor();
  });

  it('should wrap response with success structure', async () => {
    const mockContext = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue({ statusCode: 200 }),
    } as unknown as ExecutionContext;

    const data = { data: { name: 'test' }, message: 'Fetched' };

    const callHandler: CallHandler = {
      handle: () => of(data),
    };

    const result = await interceptor
      .intercept(mockContext, callHandler)
      .toPromise();

    expect(result).toEqual({
      success: true,
      code: 200,
      message: 'Fetched',
      data: { name: 'test' },
    });
  });

  it('should provide default values if message or data are missing', async () => {
    const mockContext = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue({ statusCode: 201 }),
    } as unknown as ExecutionContext;

    const rawData = 'raw response';

    const callHandler: CallHandler = {
      handle: () => of(rawData),
    };

    const result = await interceptor
      .intercept(mockContext, callHandler)
      .toPromise();

    expect(result).toEqual({
      success: true,
      code: 201,
      message: 'Success',
      data: 'raw response',
    });
  });
});
