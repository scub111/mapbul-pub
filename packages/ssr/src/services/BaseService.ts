import { PageContent } from "@mapbul-pub/types";
import { api } from "./api";
import { IEndpointFn } from "./endpoints";

type TMapFn<TDto, TData> = (dto: TDto) => Promise<TData>;

export class BaseService<TDto, TModel> {
  constructor(private endpointFn: IEndpointFn, private mapFn: TMapFn<TDto, TModel>) { }

  list(page: number, size: number): Promise<PageContent<TModel>> {
    return api.get(this.endpointFn.list(page, size))
      .then(async (data: PageContent<TDto>) => {
        const content = await Promise.all(data.content.map(this.mapFn))
        return {
          content,
          totalPages: data.totalPages
        }
      });
  }

  get(id: string): Promise<TModel> {
    return api.get(this.endpointFn.get(id))
      .then(this.mapFn);
  }
}