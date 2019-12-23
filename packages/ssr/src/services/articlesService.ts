import { BaseService } from "./BaseService";
import { Article } from "models";
import { ENDPOINTS } from "./endpoints";
import { IArticleDTO } from "@mapbul-pub/types";
import { categoriesService, usersService, userTypesService, editorsService } from ".";
import { UserDescription } from "interfaces";

class ArticlesService extends BaseService<IArticleDTO, Article> {
  constructor() {
    super(
      ENDPOINTS.articles,
      article => Article.New(article),
      async article => {
        const [category, user] = await Promise.all([
          categoriesService.get(article.baseCategoryId),
          usersService.get(article.authorId)
        ]);
        const userType = await userTypesService.get(user.userTypeId);
        let description = "";

        if (userType.tag === 'admin') {
          description = "Админстратор"
        } else if (userType.tag === 'edit') {
          const editors = await editorsService.list(1, 1, `userId=${user.id}`);
          if (editors.content.length > 0) {
            const editor = editors.content[0]; 
            description = `Редактор ${editor.lastName} ${editor.firstName}`;
          }
        }

        const userDescription: UserDescription = {
          type: userType.tag,
          description
        };
        return Article.New(article, category, userDescription)
      }
    )
  }
}

export const articlesService = new ArticlesService();
