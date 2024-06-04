import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(4)
  @MaxLength(20)
  email: string;

  @IsNotEmpty()
  @IsEmail()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
