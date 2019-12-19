import { PageContent } from "@mapbul-pub/types";
import { Article } from "models";
import { api } from "./fetchWrapper";
import { ENDPOINTS } from "./endpoints";

interface INew<TDto, TData> {
  New: (item: TDto) => TData;
}

export class BaseService<TDto, TData> {
  private EntityClass: new () => INew<TDto, TData>;
  constructor(EntityClass: new () => INew<TDto, TData>) {
    this.EntityClass = EntityClass;
  }

  list(page: number, size: number): Promise<PageContent<TData>> {
    return api.get(ENDPOINTS.articles(page, size))
      .then(async (data: PageContent<TDto>) => {
        const content = await Promise.all(data.content.map(item => (new this.EntityClass()).New(item)))
        return {
          content,
          totalPages: data.totalPages
        }
      });
  }
  
  get(id: string): Promise<TData> {
    return api.get(ENDPOINTS.article(id))
      .then((data: TDto) => (new this.EntityClass()).New(data));
  }
}