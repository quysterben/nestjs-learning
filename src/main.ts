import { NestFactory } from '@nestjs/core';
import { ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory(errors) {
        return new HttpException(
          {
            message: 'Validation failed',
            errors: errors.map((error) => {
              return {
                field: error.property,
                message: error.constraints
                  ? Object.values(error.constraints)[0]
                  : 'Validation error',
              };
            }),
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  app.enableCors();

  await app.listen(process.env.PORT || 9900);
}
bootstrap();
