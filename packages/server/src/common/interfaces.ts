import { TID } from 'src/common/types';

export interface IGetParams {
  id: TID;
}

export interface IRemoveResult {
  id: TID;
}

export interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}