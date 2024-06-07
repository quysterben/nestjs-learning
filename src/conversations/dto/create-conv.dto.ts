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
  name: string;

  @ArrayMinSize(1)
  memberIds: mongoose.Types.ObjectId[];
}
