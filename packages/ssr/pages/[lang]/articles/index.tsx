import * as React from 'react';
import { withRedux, useArticles } from 'stores';
import { withPage, IPageProps, IPageConfig, withLocale } from 'hocs';
import { Routes } from 'constants/routes';
import { ListPage, ITEMS_PER_PAGE, ArticleListItem } from 'components';
import { Article } from 'models';
import { loadArticlesData } from 'common';

const View: React.FC<IPageProps<Article>> = ({ route, list, title, error, hasMore, loadMore, loading }) => {
  return (
    <ListPage
      route={route}
      list={list}
      title={title}
      error={error}
      hasMore={hasMore}
      loadMore={loadMore}
      loading={loading}
      component={ArticleListItem}
    />
  );
};

const config: IPageConfig<Article> = {
  route: Routes.articles,
  loadData: loadArticlesData(ITEMS_PER_PAGE),
  useList: useArticles,
};

export default withLocale(withRedux(withPage<Article>(config)(View)));
