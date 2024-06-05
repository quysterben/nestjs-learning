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
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(16)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @IsNotEmpty()
  password: string;
}
