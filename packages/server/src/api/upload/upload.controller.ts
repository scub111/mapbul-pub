import { Controller, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
// import { UploadFileService } from './upload.fileService';
import { v4 as uuidv4 } from 'uuid';
import { UploadFtpService } from './upload.ftpService';
import path from 'path';
import { IImageMeta, IImageResponse } from '@mapbul-pub/types';

interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

interface IFileResponse {
  fileName: string;
  size: number;
}

@Controller('api/upload')
export class UploadController {
  constructor(private readonly service: UploadFtpService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: IFile, @Body() body: any): Promise<IFileResponse> {
    const meta: IImageMeta = JSON.parse(body.meta);
    const fileName = `${meta.dir}/${uuidv4()}${path.extname(file.originalname)}`;
    await this.service.write(fileName, file.buffer);
    return {
      fileName,
      size: file.size
    } as IImageResponse;
  }
}
