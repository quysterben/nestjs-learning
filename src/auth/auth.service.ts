import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from 'src/common/types/jwt-payload';
import { UserDocument } from 'src/database/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<boolean> {
    try {
      const user = await this.usersService.findByEmail(registerDto.email);
      if (user) {
        throw new BadRequestException('User already exists');
      }
      await this.usersService.create({
        ...registerDto,
        password: await this.hashPassword(registerDto.password),
      });

      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(loginDto: LoginDto): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(loginDto.email);
      if (!user) {
        throw new BadRequestException('User not found');
      }

      const isPasswordMatch = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!isPasswordMatch) {
        throw new BadRequestException('Password does not match');
      }

      return {
        ...(await this.genarateToken(new JwtPayload(user.email, user._id))),
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async logout(currUser: UserDocument): Promise<boolean> {
    try {
      await this.usersService.updateRefreshToken(currUser._id, null);
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async generateTokenFromRefreshToken(refreshToken: string): Promise<any> {
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: process.env.REFRESH_TOKEN_SECRET,
        },
      );
      const user = await this.usersService.findById(payload.id);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      if (user.refreshToken !== refreshToken) {
        throw new BadRequestException('Invalid refresh token');
      }
      const newAccessToken = await this.jwtService.signAsync(
        {
          id: user._id,
          email: user.email,
        },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
        },
      );
      return {
        accessToken: newAccessToken,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async genarateToken(
    payload: JwtPayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.jwtService.signAsync(
      {
        id: payload.id,
        email: payload.email,
      },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        id: payload.id,
        email: payload.email,
      },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
      },
    );
    await this.usersService.updateRefreshToken(payload.id, refreshToken);
    return { accessToken, refreshToken };
  }

  async hashPassword(password: string): Promise<string> {
    const saltRound: number = Number(process.env.SALT_ROUND) || 10;
    const salt: string = await bcrypt.genSalt(saltRound);
    return await bcrypt.hash(password, salt);
  }
}
