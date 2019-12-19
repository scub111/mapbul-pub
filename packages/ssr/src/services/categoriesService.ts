import { BaseService } from "./BaseService";
import { ICategoryDTO } from "@mapbul-pub/types";
import { Category } from "models";
import { ENDPOINTS } from "./endpoints";

class CategoriesService extends BaseService<ICategoryDTO, Category> {
  constructor() {
    super(
      (page, size) => ENDPOINTS.articles(page, size),
      item => Category.New(item)
    )
  }
}

export const categoriesService = new CategoriesService();
