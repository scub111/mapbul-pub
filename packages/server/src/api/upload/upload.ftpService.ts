import { IUploadService } from 'serverSrc/common/IUploadService';
import * as ftp from 'basic-ftp';
import { Readable } from 'stream';
import { GlobalVar } from '@mapbul-pub/common';
import { IFileResponse, IFileCreateResponse } from '@mapbul-pub/types';
import { IFile } from 'serverSrc/common';

export class UploadFtpService implements IUploadService {
  dir = `mapbul.content`;

  async write(fileName: string, file: IFile): Promise<IFileCreateResponse> {
    const client = new ftp.Client();
    const newStream = new Readable({
      read() {
        this.push(file.buffer);
        this.push(null);
      },
    })
    // client.ftp.verbose = true;

    await client.access({
      host: GlobalVar.env.fileStorage,
      user: "FtpUser",
      password: "qwe+ASDFG",
      // secure: true
    });

    // console.log(await client.list());
    // await client.uploadFrom("README.md", "README_FTP.md")
    // const dir = `mapbul.content/ArticlePhotos`;

    await client.uploadFrom(newStream, `${this.dir}/${fileName}`);
    client.close();
    return {
      fileName,
      size: file.size
    };
  };

  async delete(fileName: string | undefined): Promise<IFileResponse> {
    if (fileName) { 
      const client = new ftp.Client();
      await client.access({
        host: GlobalVar.env.fileStorage,
        user: "FtpUser",
        password: "qwe+ASDFG",
        // secure: true
      });
      try {
        await client.remove(`${this.dir}/${fileName}`);
        client.close();
        return { fileName };
      } catch (err) {
        return { fileName: '' };
      }
    } 
    else {
      return { fileName: '' };
    }
  };
}
