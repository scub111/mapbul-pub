import { IUploadService, IFile } from 'interfaces';
import { IFileResponse, IFileCreateResponse } from '@mapbul-pub/types';
import { ftpConnectionSingleton } from 'common';
import { Mutex } from '@mapbul-pub/utils';

export class UploadFtpService implements IUploadService {
  private dir = `mapbul.content`;
  private mutex = new Mutex();

  async write(fileName: string, file: IFile): Promise<IFileCreateResponse> {
    const connection = ftpConnectionSingleton.getInstance();

    await connection.uploadFrom(file.buffer, `${this.dir}/${fileName}`);

    return {
      fileName,
      size: file.size,
    };
  }

  async delete(fileName: string | undefined): Promise<IFileResponse> {
    const unlock = await this.mutex.lock();
    if (fileName) {
      const connection = ftpConnectionSingleton.getInstance();

      if (await connection.remove(`${this.dir}/${fileName}`)) {
        unlock();
        return { fileName };
      } else {
        unlock();
        return { fileName: '' };
      }
    } else {
      unlock();
      return { fileName: '' };
    }
  }
}
