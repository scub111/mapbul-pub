import { NextPage, NextPageContext } from 'next';
import { getQueryPage } from 'utils';
import { IRootState } from 'reducers';
import { Store } from 'redux';
import { PageContent } from '@mapbul-pub/types';
import { IActionSet } from 'actions';

export interface ListPageProps<T> {
  pagination?: PageContent<T>;
  error?: string;
}

export interface IPageProps<T> {
  route: string;
  articles: Array<T>
  title: string;
  error?: string;
  hasMore?: boolean;
  loadMore?: (page: number) => Promise<void>;
}

export interface IPageConfig<T> {
  route: string;
  title: string;
  loadData: (page: number) => Promise<ListPageProps<T>>;
  useList: (reduxStore?: Store) => IUseList<T>
}

export interface IUseList<T> extends IActionSet<T> {
  articles: Array<T>;
  currentPage: number;
  totalPages: number;
}

export const withPage = <T extends object>(config: IPageConfig<T>) => (Component: React.FC<IPageProps<T>>) => {
  const ArticlesPage: NextPage<ListPageProps<T>> = ({ error }) => {
    const { articles, currentPage, totalPages, incrementCurrentPage, addList } = config.useList();
    const hasMore = currentPage < totalPages;

    const loadMore = async (_: number) => {
      if (hasMore) {
        const data = await config.loadData(currentPage + 1);
        if (data.pagination) {
          incrementCurrentPage();
          addList(data.pagination.content);
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
      const { setList, setTotalPages} = config.useList(reduxStore);
      setList(listPage?.pagination?.content || []);
      setTotalPages(listPage?.pagination?.totalPages || 0);
      return listPage;
    }
    return {};
  };

  return ArticlesPage;
}