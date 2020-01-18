import { ListPage, ITEMS_PER_PAGE, ListPageProps } from 'components';
import { NextPage, NextPageContext } from 'next';
import { getQueryPage } from 'utils';
import { PageContent } from '@mapbul-pub/types';
import { Article } from 'models';
import { articlesService } from 'services';
import { Routes } from 'ssr/src/constants';
import { withRedux } from 'stores';
import { IRootState } from 'reducers';
import { Store } from 'redux';
import { articlesActions } from 'actions';

const ArticlesPage: NextPage<ListPageProps> = ({ error }) => {
  return <ListPage route={Routes.articles} error={error} loadData={loadData} />;
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

export default withRedux(ArticlesPage);
