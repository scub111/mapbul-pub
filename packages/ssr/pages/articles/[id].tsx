import * as React from 'react';
import { NextPageContext, NextPage } from 'next';
import { articlesService } from 'services';
import { Article } from 'models';
import { PageLayout, ErrorText, ItemDetail } from 'components';

const ArticleDetailPage: NextPage<{
  item?: Article;
  error?: string;
}> = ({ item, error }) => {
  return (
    <PageLayout title="Mapbul. Детали статьи">
      {error && <ErrorText error={error} />}
      {item && <ItemDetail item={item} />}
    </PageLayout>
  );
};

ArticleDetailPage.getInitialProps = async ({ query }: NextPageContext) => {
  try {
    const { id } = query;
    const item = await articlesService.get(Array.isArray(id) ? id[0] : id);
    return { item };
  } catch (err) {
    return { error: err.message };
  }
};

export default ArticleDetailPage;
