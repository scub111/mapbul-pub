import { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import List from '../../components/List';
import { sampleFetchWrapper } from '../../utils/sample-api';
import { IArticleDTO } from '@mapbul-pub/types';

type Props = {
  items: Array<IArticleDTO>;
  pathname: string;
};

const WithInitialProps: NextPage<Props> = ({ items, pathname }) => (
  <Layout title="Mapbul | Список статей">
    <h1>Users List</h1>
    <p>
      Example fetching data from inside <code>getInitialProps()</code>.
    </p>
    <p>You are currently on: {pathname}</p>
    <List items={items} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

WithInitialProps.getInitialProps = async ({ pathname }) => {
  const items: Array<IArticleDTO> = await sampleFetchWrapper('http://localhost:3100/api/articles');

  console.log(items, pathname);

  return { items, pathname };
};

export default WithInitialProps;
