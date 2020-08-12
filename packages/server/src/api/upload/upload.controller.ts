import { Controller, Post, UseInterceptors, UploadedFile, Body, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
// import { UploadFileService } from './upload.fileService';
import { v4 as uuidv4 } from 'uuid';
import { UploadFtpService } from './upload.ftpService';
import path from 'path';
import { IImageMeta, IFileResponse, IFileCreateResponse } from '@mapbul-pub/types';
import { NotFoundInterceptor } from 'serverSrc/interceptors/NotFoundInterceptor';
import { IFile } from 'serverSrc/common';

@Controller('api/upload')
export class UploadController {
  constructor(private readonly service: UploadFtpService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: IFile, @Body() body: any): Promise<IFileCreateResponse> {
    const meta: IImageMeta = JSON.parse(body.meta);
    const fileName = `${meta.dir}/${uuidv4()}${path.extname(file.originalname)}`;
    return await this.service.write(fileName, file);    
  }

  @Delete(':fileName')
  @UseInterceptors(NotFoundInterceptor)
  async deleteItem(@Param('fileName') fileName: string): Promise<IFileResponse> {
    return await this.service.delete(fileName);
  }
}
