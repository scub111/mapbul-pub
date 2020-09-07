import { IFileResponse, IFileCreateResponse } from '@mapbul-pub/types';
import { IFile } from 'interfaces';

export interface IUploadService {
  write(fileName: string, file: IFile): Promise<IFileCreateResponse>;
  delete(fileName: string | undefined): Promise<IFileResponse>;
}
