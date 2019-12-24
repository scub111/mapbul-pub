import * as React from 'react';
import { NextPageContext } from 'next';
import { articlesService } from 'services';
import { Article } from 'models';
import { Layout } from 'components';
import { ListDetail } from 'components';

type Props = {
  item: Article;
  errors?: string;
};

class InitialPropsDetail extends React.Component<Props> {
  static getInitialProps = async ({ query }: NextPageContext) => {
    try {
      const { id } = query;
      const item = await articlesService.get(Array.isArray(id) ? id[0] : id);
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
      <Layout title="Mapbul. Детали статьи 2">
        <ListDetail item={item} />
      </Layout>
    );
  }
}

export default InitialPropsDetail;
