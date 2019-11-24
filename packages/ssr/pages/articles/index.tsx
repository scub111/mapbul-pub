import { NextPage } from 'next';
import Layout from '../../src/components/Layout';
import List from '../../src/components/List';
import { sampleFetchWrapper } from '../../src/utils/sample-api';
import { Pagination as PaginationContent, IArticleDTO } from '@mapbul-pub/types';
import Pagination from "material-ui-flat-pagination";
import { Container, makeStyles } from '../../node_modules/@material-ui/core';

const useStyles = makeStyles(theme => ({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2, 0),
  },
}));

type Props = {
  pagination: PaginationContent<IArticleDTO>;
  pathname: string;
};

const ArticlesPage: NextPage<Props> = ({ pagination }) => {
  const classes = useStyles();
  return (
    <Layout title="Mapbul. Главная">
      <List items={pagination.content} />
      <Container maxWidth="lg" className={classes.pagination}>
        <Pagination
          limit={10}
          offset={1}
          total={100}
        // onClick={(e, offset) => this.handleClick(offset)}
        />
      </Container>
    </Layout>
  )
};

ArticlesPage.getInitialProps = async ({ pathname }) => {
  const pagination: PaginationContent<IArticleDTO> = await sampleFetchWrapper('articles?page=1&size=20');
  return { pagination, pathname };
};

export default ArticlesPage;
