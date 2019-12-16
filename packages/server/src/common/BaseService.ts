import { TID } from 'src/common/types';
import { GetAllQueryDTO } from './QueryDTO';
import { PageContent } from '@mapbul-pub/types';

export interface BaseService<T> {
  getAll(query: GetAllQueryDTO): Promise<PageContent<T>> | PageContent<T>;

  // public postItem(item: T): Promise<T> | T {
  //   return null;
  // }

  // putAll(item: T): T;

  // deleteAll(): void;

  getItem(id: TID): Promise<T> | T;
  // putItem(id: TID, item: T): T;

  // deleteItem(id: TID): T;
}
