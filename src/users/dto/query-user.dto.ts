import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { ROLE_CONSTANTS } from 'src/common/constants/Common';

export class QueryUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly username: string;

  @IsEnum([ROLE_CONSTANTS.USER, ROLE_CONSTANTS.ADMIN])
  @IsOptional()
  @ApiProperty()
  readonly role: string;
}
