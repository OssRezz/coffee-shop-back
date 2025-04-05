import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const message = (exceptionResponse as any).message || 'Unexpected error';
    const errorData = (exceptionResponse as any).data || null;

    response.status(status).json({
      success: false,
      code: status,
      message,
      data: errorData,
    });
  }
}
