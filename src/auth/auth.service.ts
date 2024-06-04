import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(registerDto: RegisterDto): Promise<any> {
    try {
      const user = await this.usersService.create({
        ...registerDto,
        password: await this.hashPassword(registerDto.password),
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltRound = process.env.SALT_ROUND || 10;
    const salt = await bcrypt.genSalt(saltRound);
    return await bcrypt.hash(password, salt);
  }
}
