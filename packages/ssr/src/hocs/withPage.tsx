import { NextPage, NextPageContext } from 'next';
import { getQueryPage } from 'utils';
import { IRootState, IPageState } from 'reducers';
import { Store } from 'redux';
import { PageContent } from '@mapbul-pub/types';
import { IActionSet } from 'actions';

export interface ListPageProps<T> {
  pagination?: PageContent<T>;
  error?: string;
}

export interface IPageProps<T> {
  route: string;
  list: Array<T>;
  title: string;
  error?: string;
  hasMore?: boolean;
  loadMore?: (page: number) => Promise<void>;
  loading?: boolean;
}

export interface IPageConfig<T> {
  route: string;
  title: string;
  loadData: (page: number) => Promise<ListPageProps<T>>;
  useList: (reduxStore?: Store) => IUseList<T>;
}

export interface IUseList<T> extends IActionSet<T>, IPageState<T> {}

export const withPage = <T extends object>(config: IPageConfig<T>) => (Component: React.FC<IPageProps<T>>) => {
  const ArticlesPage: NextPage<ListPageProps<T>> = ({ error }) => {
    const { list, currentPage, totalPages, loading, incrementCurrentPage, addList } = config.useList();
    const hasMore = currentPage < totalPages;

    const loadMore = async (_: number) => {
      if (hasMore) {
        // setLoading(true);
        const data = await config.loadData(currentPage + 1);
        // setLoading(false);
        if (data.pagination) {
          incrementCurrentPage();
          addList(data.pagination.content);
        }
        // setLoading(false);
      }
    };

    return (
      <Component
        route={config.route}
        list={list}
        title={config.title}
        error={error}
        hasMore={hasMore}
        loadMore={loadMore}
        loading={loading}
      />
    );
  };

  ArticlesPage.getInitialProps = async ({ query, reduxStore }: NextPageContext & { reduxStore: Store }) => {
    const state: IRootState = reduxStore.getState();
    if (state.articles.list.length === 0) {
      const { setList, setTotalPages } = config.useList(reduxStore);
      const queryPage = getQueryPage(query);
      const listPage = await config.loadData(queryPage);
      setList(listPage?.pagination?.content || []);
      setTotalPages(listPage?.pagination?.totalPages || 0);
      return listPage;
    }
    return {};
  };

  return ArticlesPage;
};
