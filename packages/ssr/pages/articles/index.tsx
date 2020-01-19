import * as React from 'react';
import { withRedux } from "stores";
import { withPage, IPageProps, IPageConfig } from "hocs";
import { Routes } from 'ssr/src/constants';
import { ListPage, ITEMS_PER_PAGE, ListPageProps } from 'components';
import { PageContent } from '@mapbul-pub/types';
import { Article } from 'models';
import { articlesService } from 'services';


const View: React.FC<IPageProps> = ({ route, articles, title, error, hasMore, loadMore }) => {
  return <ListPage
    route={route}
    articles={articles}
    title={title}
    error={error}
    hasMore={hasMore}
    loadMore={loadMore}
  />;
};

const loadData = async (page: number): Promise<ListPageProps> => {
  try {
    const pagination: PageContent<Article> = await articlesService.list({
      page: page,
      size: ITEMS_PER_PAGE,
      filter: 'StatusId = 2 AND StartDate is null',
      sort: 'PublishedDate desc',
    });
    return { pagination };
  } catch (err) {
    return { error: err.message };
  }
};

const config: IPageConfig = {
  route: Routes.articles,
  title: 'Mapbul. Статьи',
  loadData 
}

export default withRedux(withPage(config)(View));