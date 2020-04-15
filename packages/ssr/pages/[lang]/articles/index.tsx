import * as React from 'react';
import { withRedux, useArticles } from 'stores';
import { withPage, IPageProps, IPageConfig } from 'hocs';
import { Routes } from 'constants/routes';
import { ListPage, ITEMS_PER_PAGE } from 'components';
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
    />
  );
};

// const loadData = async (page: number): Promise<ListPageProps<Article>> => {
//   try {
//     const pagination: PageContent<Article> = await articlesService.list({
//       page,
//       size: ITEMS_PER_PAGE,
//       filter: 'StatusId = 2 AND StartDate is null',
//       sort: 'PublishedDate desc',
//     });
//     return { pagination };
//   } catch (err) {
//     return { error: err.message };
//   }
// };

const config: IPageConfig<Article> = {
  route: Routes.articles,
  title: 'X-island. Статьи',
  loadData: loadArticlesData(ITEMS_PER_PAGE),
  useList: useArticles,
};

export default withRedux(withPage<Article>(config)(View));
