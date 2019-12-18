import { Article } from "models/Article";
import { ENDPOINTS } from "./endpoints";
import { api } from "./fetchWrapper";
import { IArticleDTO, PageContent } from "@mapbul-pub/types";

export namespace articlesService {
  export function list(page: number, size: number): Promise<PageContent<Article>> {
    return api.get(ENDPOINTS.articles(page, size))
      .then(async (data: PageContent<IArticleDTO>) => {
        const content = await Promise.all(data.content.map(item => Article.New(item)))
        return {
          content,
          totalPages: data.totalPages
        }
      });
  }
  export function get(id: string): Promise<Article> {
    return api.get(ENDPOINTS.article(id))
      .then((data: IArticleDTO) => Article.New(data));
  }
}