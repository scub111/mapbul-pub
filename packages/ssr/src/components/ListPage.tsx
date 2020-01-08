import * as React from 'react';
import Router from 'next/router';
import Pagination from 'material-ui-flat-pagination';
import { PageLayout, ErrorText } from 'components';
import { List } from 'components';
import { PageContent } from '@mapbul-pub/types';
import { Container, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import { Article } from 'models';
import { Routes } from 'ssr/src/constants';
import { getQueryPage } from 'utils';

export const ITEMS_PER_PAGE = 10;

const useStyles = makeStyles(theme => ({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2, 0),
  },
}));

export const ListPage: React.FC<{
  pagination?: PageContent<Article>;
  error?: string;
}> = ({ pagination, error }) => {
  const router = useRouter();
  const queryPage = getQueryPage(router.query);
  const classes = useStyles();
  return (
    <PageLayout title="Mapbul. Статьи">
      {error && <ErrorText error={error} />}
      {pagination && (
        <>
          <List items={pagination.content} />
          <Container maxWidth="lg" className={classes.pagination}>
            <Pagination
              limit={ITEMS_PER_PAGE}
              offset={ITEMS_PER_PAGE * (queryPage - 1)}
              total={ITEMS_PER_PAGE * pagination.totalPages}
              onClick={(_: any, offset: number) => {
                const queryPage = offset / ITEMS_PER_PAGE + 1;
                Router.push(`/${Routes.articles}?page=${queryPage}`, `/${Routes.articles}?page=${queryPage}`);
              }}
              size="large"
            />
          </Container>
        </>
      )}
    </PageLayout>
  );
};
