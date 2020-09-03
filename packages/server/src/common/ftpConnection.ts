import * as ftp from 'basic-ftp';
import { GlobalVar } from '@mapbul-pub/common';
import { Readable } from 'stream';

class FtpConnection {
  client: ftp.Client;
  private isConnected: boolean;

  async connect() {
    this.client = new ftp.Client();

    await this.client.access({
      host: GlobalVar.env.fileStorage,
      user: 'FtpUser',
      password: 'qwe+ASDFG',
      // secure: true
    });
  }

  async uploadFrom(buffer: Buffer, toRemotePath: string): Promise<any> {
    try {
      if (!this.isConnected) {
        await this.connect();
      }

      const newStream = new Readable({
        read() {
          this.push(buffer);
          this.push(null);
        },
      });

      await this.client.uploadFrom(newStream, toRemotePath);

      this.isConnected = true;
    } catch (e) {
      this.disconnect();
      throw e;
    }
  }

  async remove(path: string): Promise<boolean> {
    try {
      if (!this.isConnected) {
        await this.connect();
      }

      await this.client.remove(path);

      this.isConnected = true;
      return true;
    } catch (e) {
      this.disconnect();
      // throw e;
      return false;
    }
  }

  disconnect() {
    this.isConnected = false;
    if (this.client) {
      this.client.close();
    }
  }
}

export class FtpConnectionSingleton {
  private static instance: FtpConnection;

  constructor() {
    if (!FtpConnectionSingleton.instance) {
      FtpConnectionSingleton.instance = new FtpConnection();
    }
  }

  public getInstance() {
    return FtpConnectionSingleton.instance;
  }
}

export const ftpConnectionSingleton = new FtpConnectionSingleton();
