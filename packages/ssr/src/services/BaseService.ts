import { PageContent, IGetAllQuery } from '@mapbul-pub/types';
import { api } from '.';
import { IEndpointFn } from '.';
// import { sleep } from 'scub111-common';

type TMapFn<TDto, TData> = (dto: TDto) => Promise<TData>;

export class BaseService<TDto, TModel> {
  constructor(
    private endpointFn: IEndpointFn,
    private listFn: TMapFn<TDto, TModel>,
    private getFn?: TMapFn<TDto, TModel>,
  ) {}

  list(query: IGetAllQuery): Promise<PageContent<TModel>> {
    return api.get(this.endpointFn.list(query)).then(async (data: PageContent<TDto>) => {
      // await sleep(0);
      return {
        content: await Promise.all(data.content.map(this.listFn)),
        totalElements: data.totalElements,
        totalPages: data.totalPages,
      };
    });
  }

  get(id: string | number): Promise<TModel> {
    return api.get(this.endpointFn.get(id)).then(this.getFn || this.listFn);
  }
}
