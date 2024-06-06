import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ROLE_CONSTANTS } from 'src/common/constants/Common';

export class QueryUserDto {
  @IsString()
  @IsOptional()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly username: string;

  @IsEnum([ROLE_CONSTANTS.USER, ROLE_CONSTANTS.ADMIN])
  @IsOptional()
  readonly role: number;
}
