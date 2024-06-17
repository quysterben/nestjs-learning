import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateConvDto {
  @MinLength(1)
  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ArrayMinSize(1)
  @ApiProperty()
  memberIds: mongoose.Types.ObjectId[];
}
