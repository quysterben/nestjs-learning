import { NestFactory } from '@nestjs/core';
import { ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(process.env.PORT || 9900);
}
bootstrap();
