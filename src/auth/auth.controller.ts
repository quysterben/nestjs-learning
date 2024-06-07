import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SuccesssResponse } from 'src/common/types/response';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserDocument } from 'src/database/schemas/user.schema';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

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

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  async logout(
    @Body() req: any,
    @Res() res: Response,
    @CurrentUser() currUser: UserDocument,
  ): Promise<Response> {
    await this.authService.logout(currUser);
    return res
      .status(HttpStatus.ACCEPTED)
      .json(new SuccesssResponse('User logged out successfully'));
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refresh(
    @Body() req: any,
    @Res() res: Response,
    @CurrentUser() currUser: UserDocument,
  ): Promise<Response> {
    return res
      .status(HttpStatus.ACCEPTED)
      .json(
        await this.authService.generateTokenFromRefreshToken(
          req.refreshToken,
          currUser,
        ),
      );
  }
}
