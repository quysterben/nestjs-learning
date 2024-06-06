import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ROLE_CONSTANTS } from 'src/common/constants/Common';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  username: string;

  @Prop({
    type: Number,
    required: true,
    default: ROLE_CONSTANTS.USER,
  })
  role: number;

  @Prop({
    type: String,
    required: false,
  })
  avatarUrl: string;

  @Prop({
    type: String,
    required: false,
  })
  refreshToken: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
