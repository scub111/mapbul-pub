import { Controller, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { promises as fs } from 'fs';

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
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: IFile, @Body() body: any): Promise<IFileResponse> {
    console.log(111, body.meta);
    const response = await fs.writeFile(file.originalname, file.buffer, "binary");
    console.log(response);
    return {
      fileName: file.originalname,
      size: file.size
    }
  }
}
