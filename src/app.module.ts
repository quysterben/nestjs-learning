import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';

import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
