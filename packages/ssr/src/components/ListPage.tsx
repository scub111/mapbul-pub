import * as React from 'react';
import { PageLayout, ErrorText } from 'components';
import { List } from 'components';
import { PageContent } from '@mapbul-pub/types';
import { Button } from '@material-ui/core';
import { Article } from 'models';
import { useState } from 'react';
import { Counter } from './Counter';
import { useArticles } from 'stores';

export const ITEMS_PER_PAGE = 12;

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
  const { articles, addArticles } = useArticles();
  // console.log(articles);
  const [currentPage, setCurrentPage] = useState<number>(2);
  return (
    <PageLayout title="Mapbul. Статьи">
      {error && <ErrorText error={error} />}
      {articles && (
        <>
          <Counter />
          <List items={articles} route={route} />
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
                  addArticles(data.pagination.content);
                }
              }}
            >
              Submit
            </Button>
          )}
        </>
      )}
    </PageLayout>
  );
};
