import { BaseService } from './BaseService';
import { Article, User } from 'models';
import { ENDPOINTS } from './endpoints';
import { IArticleDTO } from '@mapbul-pub/types';
import {
  categoriesService,
  usersService,
  userTypesService,
  editorsService,
  journalistsService,
  guidesService,
  tenantsService,
} from '.';
import { UserDescription } from 'interfaces';

const analizeUserTag = async (service: BaseService<any, any>, user: User, caption: string): Promise<string> => {
  const journalists = await service.list({ page: 1, size: 1, filter: `userId=${user.id}` });
  if (journalists.content.length > 0) {
    const journalist = journalists.content[0];
    return `${caption} ${journalist.lastName} ${journalist.firstName}`;
  }
  return '';
};

class ArticlesService extends BaseService<IArticleDTO, Article> {
  constructor() {
    super(
      ENDPOINTS.articles,
      article => Article.New(article),
      async article => {
        const [category, user] = await Promise.all([
          categoriesService.get(article.baseCategoryId),
          usersService.get(article.authorId),
        ]);
        const userType = await userTypesService.get(user.userTypeId);
        let description = '';

        if (userType.tag === 'admin') {
          description = 'Администратор';
        } else if (userType.tag === 'edit') {
          description = await analizeUserTag(editorsService, user, 'Редактор:');
        } else if (userType.tag === 'journ') {
          description = await analizeUserTag(journalistsService, user, 'Журналист:');
        } else if (userType.tag === 'guide') {
          description = await analizeUserTag(guidesService, user, 'Гид:');
        } else if (userType.tag === 'tenant') {
          description = await analizeUserTag(tenantsService, user, 'Житель:');
        }

        const userDescription: UserDescription = {
          type: userType.tag,
          description,
        };
        return Article.New(article, category, userDescription);
      },
    );
  }
}

export const articlesService = new ArticlesService();
