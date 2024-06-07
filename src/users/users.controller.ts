import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';
import { QueryUserDto } from './dto/query-user.dto';
import { PaginationResponse } from 'src/common/types/response';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(
    @CurrentUser() user,
    @Query() filter: QueryUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    const users = await this.usersService.query(filter);
    return res.status(HttpStatus.OK).json(new PaginationResponse(users));
  }
}
