import { NextPage } from 'next';
import Layout from '../../src/components/Layout';
import List from '../../src/components/List';
import { sampleFetchWrapper } from '../../utils/sample-api';
import { Pagination, IArticleDTO } from '@mapbul-pub/types';
import Link from '../../src/Link';

type Props = {
  pagination: Pagination<IArticleDTO>;
  pathname: string;
};

const WithInitialProps: NextPage<Props> = ({ pagination, pathname }) => (
  <Layout title="Mapbul. Главная">
    <h1>Articles List</h1>
    <p>You are currently on: {pathname}</p>
    <List items={pagination.data} />
    <p>
      <Link href="/">Go home</Link>
    </p>
  </Layout>
);

WithInitialProps.getInitialProps = async ({ pathname }) => {
  const pagination: Pagination<IArticleDTO> = await sampleFetchWrapper('articles');
  return { pagination, pathname };
};

export default WithInitialProps;
