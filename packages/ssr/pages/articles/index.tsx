import { ListPage, ITEMS_PER_PAGE, ListPageProps } from 'components';
import { NextPage, NextPageContext } from 'next';
import { getQueryPage } from 'utils';
import { PageContent } from '@mapbul-pub/types';
import { Article } from 'models';
import { articlesService } from 'services';
import { Routes } from 'ssr/src/constants';
import { withRedux } from 'stores';

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

type Context = NextPageContext & { reduxStore: any };

// ArticlesPage.getInitialProps = async (context: any) => {
ArticlesPage.getInitialProps = async ({ query, reduxStore }: Context) => {
  const state = reduxStore.getState();
  console.log(state);
  if (state.articles.length === 0) {
    const queryPage = getQueryPage(query);
    const listPage = await loadData(queryPage);
    const { dispatch } = reduxStore;
    dispatch({
      type: 'SET_ARTICLES',
      payload: listPage?.pagination?.content,
    });

    return listPage;
  }
  return {};
};

export default withRedux(ArticlesPage);
