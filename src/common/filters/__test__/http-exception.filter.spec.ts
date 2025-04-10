import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;
  let mockResponse: Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpExceptionFilter],
    }).compile();

    filter = module.get<HttpExceptionFilter>(HttpExceptionFilter);
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
  });

  it('should handle generic exception response structure', () => {
    const exception = new HttpException(
      'Unauthorized',
      HttpStatus.UNAUTHORIZED,
    );

    filter.catch(exception, {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
      }),
    } as any);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      code: 401,
      message: 'Unauthorized',
      data: null,
    });
  });

  it('should handle exception with custom message and data', () => {
    const exception = new HttpException(
      { message: 'Custom error message', data: { detail: 'Additional info' } },
      HttpStatus.BAD_REQUEST,
    );

    filter.catch(exception, {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
      }),
    } as any);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      code: 400,
      message: 'Custom error message',
      data: { detail: 'Additional info' },
    });
  });
});
