import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type KeyDocument = HydratedDocument<Key>;

@Schema()
export class Key {
  @Prop({
    type: String,
  })
  refreshToken: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: string;
}

export const KeySchema = SchemaFactory.createForClass(Key);
