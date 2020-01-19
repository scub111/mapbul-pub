import * as React from 'react';
import { PageContent } from '@mapbul-pub/types';
import { withRedux, useArticles } from "stores";
import { withPage, IPageProps, IPageConfig, ListPageProps } from "hocs";
import { Routes } from 'ssr/src/constants';
import { ListPage, ITEMS_PER_PAGE } from 'components';
import { Article } from 'models';
import { articlesService } from 'services';

const View: React.FC<IPageProps<Article>> = ({ route, list, title, error, hasMore, loadMore, loading }) => {
  return <ListPage
    route={route}
    list={list}
    title={title}
    error={error}
    hasMore={hasMore}
    loadMore={loadMore}
    loading={loading}
  />;
};

const loadData = async (page: number): Promise<ListPageProps<Article>> => {
  try {
    const pagination: PageContent<Article> = await articlesService.list({
      page,
      size: ITEMS_PER_PAGE,
      filter: 'StatusId = 2 AND StartDate is null',
      sort: 'PublishedDate desc',
    });
    return { pagination };
  } catch (err) {
    return { error: err.message };
  }
};

const config: IPageConfig<Article> = {
  route: Routes.articles,
  title: 'Mapbul. Статьи',
  loadData,
  useList: useArticles
}

export default withRedux(withPage<Article>(config)(View));