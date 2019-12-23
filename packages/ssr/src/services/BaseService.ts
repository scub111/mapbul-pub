import { PageContent } from "@mapbul-pub/types";
import { api } from ".";
import { IEndpointFn } from ".";

type TMapFn<TDto, TData> = (dto: TDto) => Promise<TData>;

export class BaseService<TDto, TModel> {
  constructor(
    private endpointFn: IEndpointFn,
    private listFn: TMapFn<TDto, TModel>,
    private getFn?: TMapFn<TDto, TModel>
  ) { }

  list(page?: number, size?: number, filter?: string): Promise<PageContent<TModel>> {
    return api.get(this.endpointFn.list(page, size, filter))
      .then(async (data: PageContent<TDto>) => {
        const content = await Promise.all(data.content.map(this.listFn))
        return {
          content,
          totalPages: data.totalPages
        }
      });
  }

  get(id: string | number): Promise<TModel> {
    return api.get(this.endpointFn.get(id))
      .then(this.getFn || this.listFn);
  }
}