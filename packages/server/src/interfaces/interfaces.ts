import { TID } from 'interfaces';
import { IUserDTO } from '@mapbul-pub/types';

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

export interface IOkPacket {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
}

export interface IRequest {
  user: Partial<IUserDTO>;
}
