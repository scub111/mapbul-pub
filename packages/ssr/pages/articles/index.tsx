import { NextPage } from 'next';
import Layout from '../../src/components/Layout';
import List from '../../src/components/List';
import { sampleFetchWrapper } from '../../src/utils/sample-api';
import { Pagination, IArticleDTO } from '@mapbul-pub/types';

type Props = {
  pagination: Pagination<IArticleDTO>;
  pathname: string;
};

const ArticlesPage: NextPage<Props> = ({ pagination }) => (
  <Layout title="Mapbul. Главная">
    <List items={pagination.content} />
  </Layout>
);

ArticlesPage.getInitialProps = async ({ pathname }) => {
  const pagination: Pagination<IArticleDTO> = await sampleFetchWrapper('articles?page=1&size=20');
  return { pagination, pathname };
};

export default ArticlesPage;
