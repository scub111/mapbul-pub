import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { PageLayout, ErrorText } from 'components';
import { List } from 'components';
// import { Button } from '@material-ui/core';
import { Article } from 'models';
import { IPageProps } from 'hocs';

export const ITEMS_PER_PAGE = 10;

// const useStyles = makeStyles(theme => ({
//   pagination: {
//     display: 'flex',
//     justifyContent: 'center',
//     padding: theme.spacing(2, 0),
//   },
// }));

export const ListPage: React.FC<IPageProps<Article>> = ({ route, articles, title, error, hasMore, loadMore }) => {
  return (
    <PageLayout title={title}>
      {error && <ErrorText error={error} />}
      {articles && (
        <InfiniteScroll
          hasMore={hasMore}
          loadMore={async (page) => loadMore && await loadMore(page)}
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
