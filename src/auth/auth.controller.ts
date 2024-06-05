import { Body, Controller, Post } from '@nestjs/common';

import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

import { SuccesssResponse } from 'src/common/types/response';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<SuccesssResponse> {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return await this.authService.login(loginDto);
  }
}
