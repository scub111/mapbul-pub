import { IUploadService } from 'serverSrc/common/IUploadService';
import { promises as fs } from 'fs';

export class UploadFtpService implements IUploadService {
  write(fileName: string, data: string | Buffer): Promise<void> {
    return fs.writeFile(fileName, data, "binary");
  }
}
