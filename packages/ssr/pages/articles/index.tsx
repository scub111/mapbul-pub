import { NextPage } from 'next';
import Layout from '../../src/components/Layout';
import List from '../../src/components/List';
import { sampleFetchWrapper } from '../../src/utils/sample-api';
import { Pagination, IArticleDTO } from '@mapbul-pub/types';

type Props = {
  pagination: Pagination<IArticleDTO>;
  pathname: string;
};

const WithInitialProps: NextPage<Props> = ({ pagination }) => (
  <Layout title="Mapbul. Главная">
    <List items={pagination.content} />
  </Layout>
);

WithInitialProps.getInitialProps = async ({ pathname }) => {
  const pagination: Pagination<IArticleDTO> = await sampleFetchWrapper('articles?page=1&limit=20');
  return { pagination, pathname };
};

export default WithInitialProps;
