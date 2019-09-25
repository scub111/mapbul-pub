import { TID } from 'server/common/types';

export abstract class BaseService<T> {
  public getAll(): Promise<T[]> | T[] {
    return null;
  }
  public postItem(item: T): T {
    return null;
  }
  public putAll(item: T): T {
    return null;
  }
  public deleteAll(): void {}
  public getItem(id: TID): Promise<T> | T {
    return null;
  }
  public putItem(id: TID, item: T): T {
    return null;
  }
  public deleteItem(id: TID): T {
    return null;
  }
}
