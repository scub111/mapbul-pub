import * as React from 'react';
import Router from 'next/router';
import Pagination from 'material-ui-flat-pagination';
import { PageLayout, ErrorText } from 'components';
import { List } from 'components';
import { PageContent } from '@mapbul-pub/types';
import { Container, makeStyles, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { Article } from 'models';
import { getQueryPage } from 'utils';
import { useState } from 'react';

export const ITEMS_PER_PAGE = 12;

export interface ListPageProps {
  pagination?: PageContent<Article>;
  error?: string;
}

export type ListLoadDataCb = (page: number) => Promise<ListPageProps>;

const useStyles = makeStyles(theme => ({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2, 0),
  },
}));

export const ListPage: React.FC<{
  pagination: PageContent<Article> | undefined;
  route: string;
  error?: string;
  loadData?: ListLoadDataCb;
}> = ({ pagination, route, error, loadData }) => {
  const router = useRouter();
  const queryPage = getQueryPage(router.query);
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState<number>(2);
  const [state, setState] = useState<Array<Article>>(pagination ? pagination.content : []);
  return (
    <PageLayout title="Mapbul. Статьи">
      {error && <ErrorText error={error} />}
      {pagination && (
        <>
          <List items={state} route={route} />
          {loadData && (
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={async () => {
                const data = await loadData(currentPage);
                console.log(data);
                if (data.pagination) {
                  setCurrentPage(currentPage + 1);
                  setState([...state, ...data.pagination.content]);
                }
              }}
            >
              Submit
            </Button>
          )}
          <Container maxWidth="lg" className={classes.pagination}>
            <Pagination
              limit={ITEMS_PER_PAGE}
              offset={ITEMS_PER_PAGE * (queryPage - 1)}
              total={ITEMS_PER_PAGE * pagination.totalPages}
              onClick={(_: any, offset: number) => {
                const queryPage = offset / ITEMS_PER_PAGE + 1;
                Router.push(`/${route}?page=${queryPage}`, `/${route}?page=${queryPage}`);
              }}
              size="large"
            />
          </Container>
        </>
      )}
    </PageLayout>
  );
};
