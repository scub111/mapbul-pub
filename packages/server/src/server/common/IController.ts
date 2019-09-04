import { TID } from 'server/common/types';

export interface IController<T> {
  getAll(): Promise<T[]> | T[];
  postItem(item: T): T;
  putAll(item: T): T;
  deleteAll(): void;
  getItem(id: TID): T;
  putItem(id: TID, item: T): T;
  deleteItem(id: TID): T;
}