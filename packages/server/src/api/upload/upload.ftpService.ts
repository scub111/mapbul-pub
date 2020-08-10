import { IUploadService } from 'serverSrc/common/IUploadService';
import * as ftp from 'basic-ftp';
import { Readable } from 'stream';

export class UploadFtpService implements IUploadService {
  dir = `mapbul.content`;

  async write(fileName: string, data: string | Buffer): Promise<void> {
    const client = new ftp.Client();
    const newStream = new Readable({
      read() {
        this.push(data);
        this.push(null);
      },
    })
    // client.ftp.verbose = true;

    await client.access({
      host: "192.168.0.22",
      user: "FtpUser",
      password: "qwe+ASDFG",
      // secure: true
    });

    // console.log(await client.list());
    // await client.uploadFrom("README.md", "README_FTP.md")
    // const dir = `mapbul.content/ArticlePhotos`;
    
    await client.uploadFrom(newStream, `${this.dir}/${fileName}`);
    // await client.downloadTo("README_COPY.md", "README_FTP.md")
    // await client.downloadTo(data, "README_FTP.md");

    client.close()
  }
}
