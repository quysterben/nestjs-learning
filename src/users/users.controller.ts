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
import { diskStorage } from 'multer';
import { Response } from 'express';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserDocument } from 'src/database/schemas/user.schema';
import { UsersService } from './users.service';
import { QueryUserDto } from './dto/query-user.dto';
import { PaginationResponse } from 'src/common/types/response';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

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
    @CurrentUser() currUser: UserDocument,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.usersService.updateAvatar(file, currUser._id);
    return res.status(HttpStatus.OK).json(result);
  }
}
