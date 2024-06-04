import { Body, Controller, Post } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
