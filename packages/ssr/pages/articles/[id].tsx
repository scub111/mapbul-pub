import * as React from 'react';
import { NextPageContext, NextPage } from 'next';
import { articlesService } from 'services';
import { Article } from 'models';
import { DetailPage } from 'components';

const ArticleDetailPage: NextPage<{
  item?: Article;
  error?: string;
}> = ({ item, error }) => {
  return <DetailPage item={item} error={error} />;
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
