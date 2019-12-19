import { BaseService } from "./BaseService";
import { Article } from "models/Article";
import { ENDPOINTS } from "./endpoints";
import { IArticleDTO } from "@mapbul-pub/types";

class ArticlesService extends BaseService<IArticleDTO, Article> {
  constructor() {
    super(
      (page, size) => ENDPOINTS.articles(page, size),
      item => Article.New(item)
    )
  }
}

export const articlesService = new ArticlesService();
