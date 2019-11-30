import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';
import Layout from '../../src/components/Layout';
import List from '../../src/components/List';
import { sampleFetchWrapper } from '../../src/utils/sample-api';
import { PageContent, IArticleDTO } from '@mapbul-pub/types';
import { Container, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import Pagination from 'material-ui-flat-pagination';

const ITEMS_PER_PAGE = 10;

const useStyles = makeStyles(theme => ({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2, 0),
  },
}));

type Props = {
  pagination: PageContent<IArticleDTO>;
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
  const pagination: PageContent<IArticleDTO> = await sampleFetchWrapper(
    `articles?page=${queryPage}&size=${ITEMS_PER_PAGE}`,
  );
  return { pagination };
};

export default ArticlesPage;
