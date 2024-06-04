import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

function validationResponse(errors: ValidationError[]): any {
  return {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Validation failed',
    errors: errors.map((error) => ({
      field: error.property,
      message: error.constraints
        ? Object.values(error.constraints)[0]
        : 'Validation error',
    })),
  };
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validationResponse,
    }),
  );
  await app.listen(process.env.PORT || 9900);
}
bootstrap();
