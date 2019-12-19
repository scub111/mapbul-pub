import { ENDPOINTS } from "./endpoints";
import { api } from "./fetchWrapper";
import { PageContent, ICategoryDTO } from "@mapbul-pub/types";
import { Category } from "models";

export namespace categoriesService {
  export function list(page: number, size: number): Promise<PageContent<Category>> {
    return api.get(ENDPOINTS.articles(page, size))
      .then(async (data: PageContent<ICategoryDTO>) => {
        const content = await Promise.all(data.content.map(item => Category.New(item)))
        return {
          content,
          totalPages: data.totalPages
        }
      });
  }
  
  export function get(id: string): Promise<Category> {
    return api.get(ENDPOINTS.article(id))
      .then((data: ICategoryDTO) => Category.New(data));
  }
}