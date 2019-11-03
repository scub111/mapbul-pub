import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';

export interface IController<T> {
  getAll(): Promise<T[]> | T[];
  postItem(item: T): T;
  putAll(item: T): T;
  deleteAll(): void;
  getItem(params: IGetParams): Promise<T> | T;
  putItem(id: TID, item: T): T;
  deleteItem(id: TID): T;
}
