import { Controller, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileService } from './upload.fileService';

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
  constructor(private readonly service: UploadFileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: IFile, @Body() body: any): Promise<IFileResponse> {
    console.log(111, body.meta);
    const response = await this.service.write(file.originalname, file.buffer);
    console.log(response);
    return {
      fileName: file.originalname,
      size: file.size
    }
  }
}
