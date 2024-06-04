import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const user = await this.usersService.findByEmail(registerDto.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    return await this.usersService.create({
      ...registerDto,
      password: await this.hashPassword(registerDto.password),
    });
  }

  async login(loginDto: LoginDto): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(loginDto.email);
      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordMatch = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!isPasswordMatch) {
        throw new Error('Password does not match');
      }

      return {
        ...(await this.genarateToken({
          email: user.email,
          id: user._id,
        })),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async genarateToken(payload: { email: string; id: mongoose.Types.ObjectId }) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    });
    await this.usersService.updateRefreshToken(payload.id, refreshToken);
    return { accessToken, refreshToken };
  }

  async hashPassword(password: string): Promise<any> {
    const saltRound: number = Number(process.env.SALT_ROUND) || 10;
    const salt: string = await bcrypt.genSalt(saltRound);
    return await bcrypt.hash(password, salt);
  }
}
