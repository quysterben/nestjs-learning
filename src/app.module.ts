import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@ecomshopcluster.evimone.mongodb.net/${process.env.DATABASE_NAME}`,
    ),
    AuthModule,
    UsersModule,
  ],
  providers: [],
})
export class AppModule {}
