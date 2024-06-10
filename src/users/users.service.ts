import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';

import { UserDocument } from 'src/database/schemas/user.schema';

import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel({
      ...createUserDto,
      refreshToken: null,
    });
    return await createdUser.save();
  }

  async findById(id: mongoose.Types.ObjectId): Promise<UserDocument> {
    return await this.userModel.findById(id, '-password').exec();
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

  async updateAvatar(avatar: Express.Multer.File, id: mongoose.Types.ObjectId) {
    const user = await this.userModel.findById(id);

    if (user.avatarUrl) {
      await this.cloudinaryService.destroyFile(user.avatarUrl);
    }

    const cloudinaryRes = await this.cloudinaryService.uploadFile(avatar);

    return await this.userModel.findByIdAndUpdate(id, {
      avatarUrl: cloudinaryRes.secure_url,
    });
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
