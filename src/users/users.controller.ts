import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { UsersService } from './users.service';
import { QueryUserDto } from './dto/query-user.dto';
import { PaginationResponse } from 'src/common/types/response';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { diskStorage } from 'multer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(
    @Query() filter: QueryUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    const users = await this.usersService.query(filter);
    return res.status(HttpStatus.OK).json(new PaginationResponse(users));
  }

  @Post('upload-avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './storage/images',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${file.originalname}`);
        },
      }),
    }),
  )
  async uploadAvatar(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'image' })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Res() res: Response,
  ): Promise<Response> {
    return res.status(HttpStatus.OK).json({ message: 'Avatar uploaded' });
  }
}
