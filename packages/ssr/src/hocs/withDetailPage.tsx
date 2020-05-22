import * as React from 'react';
import { NextPageContext, NextPage } from 'next';
import { GlobalVar } from '../config';

export interface IDetailPageProps<T> {
  item?: T;
  error?: string;
}

export interface IDetailPageConfig<T> {
  loadData: (id: string) => Promise<T>;
}

export const withDetailPage = <T extends object>(config: IDetailPageConfig<T>) => (Component: React.FC<IDetailPageProps<T>>) => {
  const ArticleDetailPage: NextPage<IDetailPageProps<T>> = ({ item, error }) => {
    // return <DetailPage item={item as Article} error={error} />;
    return <Component item={item} error={error} />;
  };

  ArticleDetailPage.getInitialProps = async ({ query }: NextPageContext) => {
    try {
      const { lang, id } = query;
      GlobalVar.setLang(lang);
      // const item = await articlesService.get(Array.isArray(id) ? id[0] : id);
      const item = await config.loadData(Array.isArray(id) ? id[0] : id);
      return { item };
    } catch (err) {
      return { error: err.message };
    }
  };
  return ArticleDetailPage;
};
