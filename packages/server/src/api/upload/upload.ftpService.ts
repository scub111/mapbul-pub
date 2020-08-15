import { IUploadService } from 'serverSrc/common/IUploadService';
import { IFileResponse, IFileCreateResponse } from '@mapbul-pub/types';
import { IFile, ftpConnectionSingleton } from 'serverSrc/common';

export class UploadFtpService implements IUploadService {
  dir = `mapbul.content`;

  async write(fileName: string, file: IFile): Promise<IFileCreateResponse> {
    const connection = ftpConnectionSingleton.getInstance();

    await connection.uploadFrom(file.buffer, `${this.dir}/${fileName}`)

    return {
      fileName,
      size: file.size
    };
  };

  async delete(fileName: string | undefined): Promise<IFileResponse> {
    if (fileName) {
      const connection = ftpConnectionSingleton.getInstance();

      if (await connection.remove(`${this.dir}/${fileName}`)) {
        return { fileName };
      } else {
        return { fileName: '' };
      }
    }
    else {
      return { fileName: '' };
    }
  };
}
