import * as React from 'react';
import { NextPageContext, NextPage } from 'next';
import { articlesService } from 'services';
import { Article } from 'models';
import { DetailPage } from 'components';
import { GlobalVar } from '../config';

export const withDetailPage = () => {
  const ArticleDetailPage: NextPage<{
    lang?: string;
    item?: Article;
    error?: string;
  }> = ({ item, error }) => {
    return <DetailPage item={item} error={error} />;
  };

  ArticleDetailPage.getInitialProps = async ({ query }: NextPageContext) => {
    try {
      const { lang, id } = query;
      console.log(111, lang, id);
      GlobalVar.setLang(lang);
      const item = await articlesService.get(Array.isArray(id) ? id[0] : id);
      return { lang: lang as string, item };
    } catch (err) {
      return { error: err.message };
    }
  };
  return ArticleDetailPage;
};
