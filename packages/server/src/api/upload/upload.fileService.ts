import { IUploadService } from 'serverSrc/common/IUploadService';
import { promises as fs } from 'fs';

export class UploadFileService implements IUploadService {
  write(fileName: string, data: string | Buffer): Promise<void> {
    const folder = `D:\\Temp`;
    return fs.writeFile(`${folder}\\${fileName}`, data, "binary");
  }
}
