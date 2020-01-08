import Router from 'next/router';
import Pagination from 'material-ui-flat-pagination';
import { PageLayout } from 'components';
import { List } from 'components';
import { NextPage, NextPageContext } from 'next';
import { PageContent } from '@mapbul-pub/types';
import { Container, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { Article } from 'models';
import { articlesService } from 'services';
import { Routes } from 'ssr/src/constants';

const ITEMS_PER_PAGE = 10;

const useStyles = makeStyles(theme => ({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2, 0),
  },
}));

type Props = {
  pagination: PageContent<Article>;
};

const getQueryPage = (query: ParsedUrlQuery): number => {
  if (query.page) {
    return Number(query.page);
  }
  return 1;
};

const ArticlesPage: NextPage<Props> = ({ pagination }) => {
  const router = useRouter();
  const queryPage = getQueryPage(router.query);
  const classes = useStyles();
  return (
    <PageLayout title="Mapbul. Статьи">
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
    </PageLayout>
  );
};

ArticlesPage.getInitialProps = async (ctx: NextPageContext) => {
  const queryPage = getQueryPage(ctx.query);
  const pagination: PageContent<Article> = await articlesService.list({
    page: queryPage,
    size: ITEMS_PER_PAGE,
    filter: 'StatusId = 2 AND StartDate is null',
    sort: 'PublishedDate desc',
  });
  return { pagination };
};

export default ArticlesPage;
