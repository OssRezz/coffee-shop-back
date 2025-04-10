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

    // Si el error es un string, lo usamos como mensaje directamente
    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any).message || 'Unexpected error';

    // Si el error es un objeto, intentamos extraer los datos adicionales
    const errorData =
      typeof exceptionResponse === 'object' && 'data' in exceptionResponse
        ? (exceptionResponse as any).data
        : null;

    response.status(status).json({
      success: false,
      code: status,
      message,
      data: errorData,
    });
  }
}
