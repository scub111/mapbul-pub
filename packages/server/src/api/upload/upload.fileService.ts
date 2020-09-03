import { IUploadService } from 'serverSrc/common/IUploadService';
import { promises as fs } from 'fs';
import { IFileResponse, IFileCreateResponse } from '@mapbul-pub/types';
import { IFile } from 'serverSrc/common';

export class UploadFileService implements IUploadService {
  async write(fileName: string, file: IFile): Promise<IFileCreateResponse> {
    const folder = `D:\\Temp`;
    await fs.writeFile(`${folder}\\${fileName}`, file.buffer, 'binary');
    return {
      fileName,
      size: file.size,
    };
  }

  delete(fileName: string): Promise<IFileResponse> {
    console.log(fileName);
    throw new Error('Method not implemented.');
  }
}
