import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { PageLayout, ErrorText } from 'components';
import { List } from 'components';
import { PageContent } from '@mapbul-pub/types';
// import { Button } from '@material-ui/core';
import { Article } from 'models';
import { useArticles } from 'stores';

export const ITEMS_PER_PAGE = 10;

export interface ListPageProps {
  pagination?: PageContent<Article>;
  error?: string;
}

export type ListLoadDataCb = (page: number) => Promise<ListPageProps>;

// const useStyles = makeStyles(theme => ({
//   pagination: {
//     display: 'flex',
//     justifyContent: 'center',
//     padding: theme.spacing(2, 0),
//   },
// }));

export const ListPage: React.FC<{
  route: string;
  error?: string;
  loadData?: ListLoadDataCb;
}> = ({ route, error, loadData }) => {
  const { articles, currentPage, totalPages, incrementCurrentPage, addArticles } = useArticles();
  const hasMore = currentPage < totalPages;
  const next = async () => {
    if (loadData && hasMore) {
      const data = await loadData(currentPage + 1);
      if (data.pagination) {
        incrementCurrentPage();
        addArticles(data.pagination.content);
      }
    }
  }

  return (
    <PageLayout title="Mapbul. Статьи">
      {error && <ErrorText error={error} />}
      {articles && (
        <InfiniteScroll
          hasMore={hasMore}
          loadMore={next}
        >
          <List items={articles} route={route} />          
          {/* {loadData && hasMore && (
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={next}
            >
              Submit
            </Button>
          )} */}
        </InfiniteScroll>
      )}
    </PageLayout>
  );
};
