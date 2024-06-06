import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ConversationDocument = HydratedDocument<Conversation>;

@Schema({ timestamps: true })
export class Conversation {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  isGroup: boolean;

  @Prop({
    type: String,
    required: false,
  })
  conversationImage: string;

  @Prop({
    type: mongoose.Types.Array,
    required: true,
    ref: 'User',
  })
  adminIds: mongoose.Types.ObjectId[];

  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  })
  memberIds: mongoose.Types.ObjectId[];

  @Prop({
    type: mongoose.Types.Array,
    required: false,
    ref: 'Message',
  })
  messageIds: mongoose.Types.ObjectId[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
