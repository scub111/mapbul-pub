import { ListPage, ITEMS_PER_PAGE, ListPageProps } from 'components';
import { NextPage, NextPageContext } from 'next';
import { getQueryPage } from 'utils';
import { PageContent } from '@mapbul-pub/types';
import { Article } from 'models';
import { articlesService } from 'services';
import { Routes } from 'ssr/src/constants';
import { IRootState } from 'reducers';
import { Store } from 'redux';
import { articlesActions } from 'actions';
import { useArticles } from 'stores';

export const withPage = () => {
  const ArticlesPage: NextPage<ListPageProps> = ({ error }) => {
    const { articles, currentPage, totalPages, incrementCurrentPage, addArticles } = useArticles();
    const hasMore = currentPage < totalPages;

    const loadMore = async (_: number) => {
      if (loadData && hasMore) {
        const data = await loadData(currentPage + 1);
        if (data.pagination) {
          incrementCurrentPage();
          addArticles(data.pagination.content);
        }
      }
    }

    return <ListPage
      route={Routes.articles}
      articles={articles}
      title={'Mapbul. Статьи'}
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

  ArticlesPage.getInitialProps = async ({ query, reduxStore }: NextPageContext & { reduxStore: Store }) => {
    const state: IRootState = reduxStore.getState();
    if (state.articles.list.length === 0) {
      const queryPage = getQueryPage(query);
      const listPage = await loadData(queryPage);
      const { dispatch } = reduxStore;
      dispatch(articlesActions.setArticles(listPage?.pagination?.content || []));
      dispatch(articlesActions.setTotalPages(listPage?.pagination?.totalPages || 0));
      return listPage;
    }
    return {};
  };

  return ArticlesPage;
}