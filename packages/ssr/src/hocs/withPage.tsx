import { ListPageProps } from 'components';
import { NextPage, NextPageContext } from 'next';
import { getQueryPage } from 'utils';
import { Article } from 'models';
import { IRootState } from 'reducers';
import { Store } from 'redux';
import { useArticles } from 'stores';
import { Action } from 'redux-actions';

export type LoadMoreCb = (page: number) => Promise<void>;
export type LoadDataCb = (page: number) => Promise<ListPageProps>;

export interface IPageProps {
  route: string;
  articles: Array<Article>
  title: string;
  error?: string;
  hasMore?: boolean;
  loadMore?: LoadMoreCb;
}

export interface IPageConfig {
  route: string;
  title: string;
  loadData: LoadDataCb;
}

export interface IUseList<T> {
  articles: Array<T>;
  currentPage: number;
  totalPages: number;
  incrementCurrentPage: () => Action<any>
}

export const withPage = (config: IPageConfig) => (Component: React.FC<IPageProps>) => {
  const ArticlesPage: NextPage<ListPageProps> = ({ error }) => {
    const { articles, currentPage, totalPages, incrementCurrentPage, addArticles } = useArticles();
    const hasMore = currentPage < totalPages;

    const loadMore = async (_: number) => {
      if (hasMore) {
        const data = await config.loadData(currentPage + 1);
        if (data.pagination) {
          incrementCurrentPage();
          addArticles(data.pagination.content);
        }
      }
    }

    return <Component
      route={config.route}
      articles={articles}
      title={config.title}
      error={error}
      hasMore={hasMore}
      loadMore={loadMore}
    />;
  };

  ArticlesPage.getInitialProps = async ({ query, reduxStore }: NextPageContext & { reduxStore: Store }) => {
    const state: IRootState = reduxStore.getState();
    if (state.articles.list.length === 0) {
      const queryPage = getQueryPage(query);
      const listPage = await config.loadData(queryPage);
      const { setArticles, setTotalPages} = useArticles(reduxStore);
      setArticles(listPage?.pagination?.content || []);
      setTotalPages(listPage?.pagination?.totalPages || 0);
      return listPage;
    }
    return {};
  };

  return ArticlesPage;
}