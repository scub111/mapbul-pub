import * as React from 'react';
import { NextPageContext } from 'next';
import { fetchWrapper } from '../../src/utils/fetchWrapper';
import { IArticleDTO } from '@mapbul-pub/types';
import Layout from '../../src/components/Layout';
import ListDetail from '../../src/components/ListDetail';

type Props = {
  item: IArticleDTO;
  errors?: string;
};

class InitialPropsDetail extends React.Component<Props> {
  static getInitialProps = async ({ query }: NextPageContext) => {
    try {
      const { id } = query;
      const item = await fetchWrapper(`articles/${Array.isArray(id) ? id[0] : id}`);
      return { item };
    } catch (err) {
      return { errors: err.message };
    }
  };

  render() {
    const { item, errors } = this.props;

    if (errors) {
      return (
        <Layout title={`Mapbul. Ошибка`}>
          <p>
            <span style={{ color: 'red' }}>Error:</span> {errors}
          </p>
        </Layout>
      );
    }

    return (
      <Layout title="Mapbul. Детали статьи 2--">
        <ListDetail item={item} />
      </Layout>
    );
  }
}

export default InitialPropsDetail;
