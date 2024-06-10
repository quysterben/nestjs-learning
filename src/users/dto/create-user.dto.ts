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
  readonly email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(16)
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;
}
