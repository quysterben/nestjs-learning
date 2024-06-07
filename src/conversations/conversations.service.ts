import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ConversationDocument } from 'src/database/schemas/conversation.schema';
import { CreateConvDto } from './dto/create-conv.dto';
import { UserDocument } from 'src/database/schemas/user.schema';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectModel('Conversation')
    private conversationModel: Model<ConversationDocument>,
  ) {}

  async createConversation(
    currUser: UserDocument,
    createConvDto: CreateConvDto,
  ): Promise<ConversationDocument> {
    const newConversation = new this.conversationModel({
      name: createConvDto.name,
      creatorId: currUser._id,
      adminIds: [currUser._id],
      memberIds: [currUser._id, ...createConvDto.memberIds],
      isGroup: createConvDto.memberIds.length > 2,
    });
    return await newConversation.save();
  }
}
