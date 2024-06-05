import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';

import { UsersService } from './users.service';
import { QueryUserDto } from './dto/query-user.dto';
import { Response } from 'express';
import { PaginationResponse } from 'src/common/types/response';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(
    @Query() filter: QueryUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    const users = await this.usersService.query(filter);
    return res.status(HttpStatus.OK).json(new PaginationResponse(users));
  }
}
