import { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import List from '../../components/List';
import { sampleFetchWrapper } from '../../utils/sample-api';
import { IEditorsDTO } from '@mapbul-pub/types';

type Props = {
  items: Array<IEditorsDTO>;
  pathname: string;
};

const WithInitialProps: NextPage<Props> = ({ items, pathname }) => (
  <Layout title="Users List | Next.js + TypeScript Example">
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
  const items: Array<IEditorsDTO> = await sampleFetchWrapper('http://localhost:3100/api/editors');

  console.log(items, pathname);

  return { items, pathname };
};

export default WithInitialProps;
