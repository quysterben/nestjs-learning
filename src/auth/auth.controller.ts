import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { SuccesssResponse } from 'src/common/types/response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res() res: Response,
  ): Promise<Response> {
    await this.authService.register(registerDto);
    return res
      .status(HttpStatus.CREATED)
      .json(new SuccesssResponse('User registered successfully'));
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res() res: Response,
  ): Promise<Response> {
    return res
      .status(HttpStatus.ACCEPTED)
      .json(await this.authService.login(loginDto));
  }
}
