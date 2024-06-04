import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';

import { UserDocument } from 'src/database/schemas/user.schema';

import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findById(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({
      email,
    });
  }

  async query(filter: QueryUserDto): Promise<UserDocument[]> {
    return await this.userModel.find(filter).exec();
  }

  async updateRefreshToken(
    id: mongoose.Types.ObjectId,
    refreshToken: string,
  ): Promise<UserDocument> {
    return await this.userModel.findByIdAndUpdate(
      id,
      {
        refreshToken,
      },
      {
        new: true,
      },
    );
  }
}
