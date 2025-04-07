import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { WinstonLogger } from './common/logger/winston-logger.service';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import * as express from 'express';
import { join } from 'path';
import { ensureUploadFolderExists } from './common/helpers/ensure-folder.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        return new UnprocessableEntityException({
          success: false,
          code: 422,
          message: 'Validation failed',
          data: errors.map((error) => ({
            field: error.property,
            constraints: error.constraints,
          })),
        });
      },
    }),
  );
  app.useLogger(app.get(WinstonLogger));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  ensureUploadFolderExists();
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
  // console.log('Serving from:', join(__dirname, '..', 'uploads'));
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`🚀 App is running on http://localhost:${PORT}`);
}
bootstrap();
