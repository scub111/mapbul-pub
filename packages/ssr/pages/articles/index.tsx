import Router from 'next/router';
import { Layout } from 'components';
import { List } from 'components';
import Pagination from 'material-ui-flat-pagination';
import { NextPage, NextPageContext } from 'next';
import { PageContent } from '@mapbul-pub/types';
import { Container, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { Article } from 'models';
import { articlesService } from 'services';

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
    <Layout title="Mapbul. Статьи">
      <List items={pagination.content} />
      <Container maxWidth="lg" className={classes.pagination}>
        <Pagination
          limit={ITEMS_PER_PAGE}
          offset={ITEMS_PER_PAGE * (queryPage - 1)}
          total={ITEMS_PER_PAGE * pagination.totalPages}
          onClick={(_: any, offset: number) => {
            const queryPage = offset / ITEMS_PER_PAGE + 1;
            Router.push(`/articles?page=${queryPage}`, `/articles?page=${queryPage}`);
          }}
          size="large"
        />
      </Container>
    </Layout>
  );
};

ArticlesPage.getInitialProps = async (ctx: NextPageContext) => {
  const queryPage = getQueryPage(ctx.query);
  const pagination: PageContent<Article> = await articlesService.list(queryPage, ITEMS_PER_PAGE);
  return { pagination };
};

export default ArticlesPage;
