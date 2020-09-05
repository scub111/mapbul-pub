import express from 'express';
import { IGetParams } from 'common';
import { PageContent } from '@mapbul-pub/types';

export interface IController<T> {
  getAll(params: any): Promise<PageContent<T>> | PageContent<T>;
  // postItem(item: T): T;
  // putAll(item: T): T;
  // deleteAll(): void;
  // getItem(params: IGetParams, res: express.Response): Promise<T | express.Response> | T;
  getItem(params: IGetParams): Promise<T | express.Response> | T;
  // putItem(id: TID, item: T): T;
  // deleteItem(id: TID): T;
}
