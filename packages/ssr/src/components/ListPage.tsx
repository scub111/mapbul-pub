import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { PageLayout, ErrorText, ListBase } from 'components';
// import { Button } from '@material-ui/core';
import { IPageProps } from 'hocs';
import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { ListItemProps } from 'interfaces';

export const ITEMS_PER_PAGE = 10;

const useStyles = makeStyles(theme => ({
  loader: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
}));

export const ListPage = <T extends object>({
  route,
  list,
  title,
  error,
  hasMore,
  loadMore,
  loading,
  component,
}: IPageProps<T> & { component: React.FC<ListItemProps<T>> }) => {
  const classes = useStyles();
  return (
    <PageLayout title={title}>
      {error && <ErrorText error={error} />}
      {list && (
        <InfiniteScroll hasMore={hasMore} loadMore={async page => loadMore && (await loadMore(page))}>
          <ListBase component={component} items={list} route={route} />
          {loading && (
            <Grid className={classes.loader}>
              <CircularProgress />
            </Grid>
          )}
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
