import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { ConversationsService } from './conversations.service';
import { ConversationDocument } from 'src/database/schemas/conversation.schema';
import { CreateConvDto } from './dto/create-conv.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserDocument } from 'src/database/schemas/user.schema';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createConversation(
    @CurrentUser() currUser: UserDocument,
    @Body() createConvDto: CreateConvDto,
  ): Promise<ConversationDocument> {
    return await this.conversationsService.createConversation(
      currUser,
      createConvDto,
    );
  }
}
