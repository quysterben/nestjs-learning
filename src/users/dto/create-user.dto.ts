import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty()
  readonly email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(16)
  @IsNotEmpty()
  @ApiProperty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty()
  readonly password: string;
}
