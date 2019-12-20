import { BaseService } from "./BaseService";
import { Article } from "models";
import { ENDPOINTS } from "./endpoints";
import { IArticleDTO } from "@mapbul-pub/types";

class ArticlesService extends BaseService<IArticleDTO, Article> {
  constructor() {
    super(
      ENDPOINTS.articles,
      item => Article.New(item)
    )
  }
}

export const articlesService = new ArticlesService();
