import * as path from 'path';
import * as fs from 'fs';

import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './types/cloudinary-response';

@Injectable()
export class CloudinaryService {
  async uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    const folderPath = process.env.FOLDER_PATH || `nestjs/`;

    try {
      const uploadedFile = await cloudinary.uploader.upload(file.path, {
        folder: folderPath,
        resource_type: 'auto',
      });
      if (!uploadedFile) {
        throw new Error('File not uploaded');
      }
      this.clearFile(file.path);
      return uploadedFile;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async destroyFile(url: string): Promise<CloudinaryResponse> {
    const publishedId = String(process.env.FOLDER_PATH + url.split('/').pop());

    try {
      const deletedFile = await cloudinary.uploader.destroy(publishedId);
      if (!deletedFile) {
        throw new Error('File not deleted');
      }
      return deletedFile;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public clearFile(filePath: string): boolean {
    filePath = path.join(__dirname, '..', '..', filePath);
    fs.unlink(filePath, (err) => {
      console.log(err);
    });
    return true;
  }
}
