import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsString,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(16)
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
