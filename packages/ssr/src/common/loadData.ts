import { ListPageProps } from 'hocs';
import { Article } from 'models';
import { PageContent } from '@mapbul-pub/types';
import { articlesService } from 'services';

export const loadArticlesData = (size: number) => async (page: number): Promise<ListPageProps<Article>> => {
  try {
    const pagination: PageContent<Article> = await articlesService.list({
      page,
      size,
      filter: 'StatusId = 2 AND StartDate is null',
      sort: 'PublishedDate desc',
    });
    return { pagination };
  } catch (err) {
    return { error: err.message };
  }
};

export const loadEventsData = (size: number) => async (page: number): Promise<ListPageProps<Article>> => {
  try {
    const pagination: PageContent<Article> = await articlesService.list({
      page,
      size,
      filter: 'StatusId = 2 AND StartDate > CURDATE() AND EndDate is null',
      sort: 'StartDate',
    });
    return { pagination };
  } catch (err) {
    return { error: err.message };
  }
};
