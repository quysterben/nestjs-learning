import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  password: string;
}
