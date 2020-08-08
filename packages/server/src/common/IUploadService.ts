export interface IUploadService {
  write(fileName: string, data: string | Buffer): Promise<void>;
}