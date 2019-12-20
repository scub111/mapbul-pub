import { BaseService } from "./BaseService";
import { Article } from "models";
import { ENDPOINTS } from "./endpoints";
import { IArticleDTO } from "@mapbul-pub/types";
import { categoriesService } from ".";

class ArticlesService extends BaseService<IArticleDTO, Article> {
  constructor() {
    super(
      ENDPOINTS.articles,
      async item => {
        const [category] = await Promise.all([categoriesService.get(String(item.baseCategoryId))]);
        return Article.New(item, category)
      }
    )
  }
}

export const articlesService = new ArticlesService();
