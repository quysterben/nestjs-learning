import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsString,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  @IsString({ message: 'Email must be a string' })
  @MinLength(4, { message: 'Email is too short' })
  @MaxLength(20, { message: 'Email is too long' })
  email: string;

  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @MinLength(4, { message: 'Username is too short' })
  @MaxLength(20, { message: 'Username is too long' })
  username: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password is too short' })
  @MaxLength(20, { message: 'Password is too long' })
  password: string;
}
