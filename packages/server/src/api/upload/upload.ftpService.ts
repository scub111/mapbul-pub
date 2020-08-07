import { IUploadService } from 'serverSrc/common/IUploadService';
import * as ftp from 'basic-ftp';
import fs from 'fs';

export class UploadFtpService implements IUploadService {
  async write(fileName: string, data: string | Buffer): Promise<void> {
    console.log(333, fileName, data);
    const client = new ftp.Client();
    const readStream = fs.createReadStream(data);
    console.log(444, readStream);
    client.ftp.verbose = true;
    try {
      await client.access({
        host: "192.168.0.22",
        user: "FtpUser",
        password: "qwe+ASDFG",
        // secure: true
      })
      console.log(await client.list());
      // await client.uploadFrom("README.md", "README_FTP.md")
      await client.uploadFrom(readStream, "README_FTP.md")
      // await client.downloadTo("README_COPY.md", "README_FTP.md")
      // await client.downloadTo(data, "README_FTP.md");
    }
    catch (err) {
      console.log(err)
    }
    client.close()
  }
}
