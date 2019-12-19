import { PageContent } from "@mapbul-pub/types";
import { api } from "./api";
import { ENDPOINTS } from "./endpoints";

type TEndpointFn = (page: number, size: number) => string;
type TMapFn<TDto, TData> = (dto: TDto) => Promise<TData>;

export class BaseService<TDto, TModel> {
  constructor(private endpointFn: TEndpointFn, private mapFn: TMapFn<TDto, TModel>) { }

  list(page: number, size: number): Promise<PageContent<TModel>> {
    return api.get(this.endpointFn(page, size))
      .then(async (data: PageContent<TDto>) => {
        const content = await Promise.all(data.content.map(this.mapFn))
        return {
          content,
          totalPages: data.totalPages
        }
      });
  }

  get(id: string): Promise<TModel> {
    return api.get(ENDPOINTS.article(id))
      .then(this.mapFn);
  }
}