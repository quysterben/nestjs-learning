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
    const createdUser = new this.userModel({
      ...createUserDto,
      refreshToken: null,
    });
    return await createdUser.save();
  }

  async findById(id: mongoose.Types.ObjectId): Promise<UserDocument> {
    return await this.userModel.findById(id, '-password -refreshToken').exec();
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return await this.userModel
      .findOne(
        {
          email,
        },
        '-refreshToken',
      )
      .exec();
  }

  async query(filter: QueryUserDto): Promise<UserDocument[]> {
    const queryBuilder = this.userModel
      .find({}, '-password -refreshToken')
      .where('email', new RegExp(filter.email, 'i'))
      .where('username', new RegExp(filter.username, 'i'));

    if (filter.role) {
      queryBuilder.where('role', filter.role);
    }

    return await queryBuilder.exec();
  }

  async updateRefreshToken(
    id: mongoose.Types.ObjectId,
    refreshToken: string,
  ): Promise<UserDocument> {
    return await this.userModel.findByIdAndUpdate(id, {
      refreshToken,
    });
  }
}
