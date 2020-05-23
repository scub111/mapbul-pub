import { BaseService } from './BaseService';
import { Article } from 'models';
import { ENDPOINTS } from './endpoints';
import { IArticleDTO } from '@mapbul-pub/types';
import { categoriesService, usersService } from '.';
import { getUserDescription } from './utils';

class ArticlesService extends BaseService<IArticleDTO, Article> {
  constructor() {
    super(
      ENDPOINTS.articles,
      async article => {
        return Article.New(article);
      },
      async article => {
        const [category, user] = await Promise.all([
          categoriesService.get(article.baseCategoryId),
          usersService.get(article.authorId),
        ]);

        return Article.New(article, category, await getUserDescription(user));
      },
    );
  }
}

export const articlesService = new ArticlesService();
