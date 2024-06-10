import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@ecomshopcluster.evimone.mongodb.net/${process.env.DATABASE_NAME}`,
    ),
    AuthModule,
    UsersModule,
    ConversationsModule,
    MessagesModule,
    CloudinaryModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads',
      }),
    }),
  ],
})
export class AppModule {}
