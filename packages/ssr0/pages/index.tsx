import * as React from 'react';
// import Link from 'next/link'
import Layout from '../src/components/Layout';
import { NextPage } from 'next';
import Link from 'next/link';

const IndexPage: NextPage = () => {
  return (
    <Layout title="Mapbul">
      <h1>Mapbul 👋</h1>
      <p>
        <Link href="/about">О компании</Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
