import { NextPage } from 'next';
import Layout from '../../src/components/Layout';
import List from '../../src/components/List';
import { sampleFetchWrapper } from '../../utils/sample-api';
import { Pagination, IArticleDTO } from '@mapbul-pub/types';

type Props = {
  pagination: Pagination<IArticleDTO>;
  pathname: string;
};

const WithInitialProps: NextPage<Props> = ({ pagination }) => (
  <Layout title="Mapbul. Главная">
    <List items={pagination.data} />
  </Layout>
);

WithInitialProps.getInitialProps = async ({ pathname }) => {
  const pagination: Pagination<IArticleDTO> = await sampleFetchWrapper('articles');
  return { pagination, pathname };
};

export default WithInitialProps;
