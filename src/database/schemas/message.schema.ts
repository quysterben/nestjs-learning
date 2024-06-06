import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  })
  senderId: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Conversation',
  })
  conversationId: mongoose.Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
