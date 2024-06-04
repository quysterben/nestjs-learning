import { Controller, Get, Query } from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from 'src/database/schemas/user.schema';
import { QueryUserDto } from './dto/query-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Query() filter: QueryUserDto): Promise<User[]> {
    const users = await this.usersService.query(filter);
    return users;
  }
}
