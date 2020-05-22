import * as React from 'react';
import { NextPageContext, NextPage } from 'next';
import { GlobalVar } from '../config';
import { IPageBaseProps } from 'interfaces';

export interface IDetailItemProps<T> {
  item: T;
}

export interface IDetailPageProps<T> extends IPageBaseProps {
  item?: T;
  error?: string;
  component?: React.FC<IDetailItemProps<T>>;
}

export interface IDetailPageConfig<T> {
  loadData: (id: string) => Promise<T>;
}

export const withDetailPage = <T extends object>(config: IDetailPageConfig<T>) => (Component: React.FC<IDetailPageProps<T>>) => {
  const ArticleDetailPage: NextPage<IDetailPageProps<T>> = ({ item, error }) => {
    return <Component item={item} error={error} />;
  };

  ArticleDetailPage.getInitialProps = async ({ query }: NextPageContext) => {
    try {
      const { lang, id } = query;
      GlobalVar.setLang(lang);
      const item = await config.loadData(Array.isArray(id) ? id[0] : id);
      return { item };
    } catch (err) {
      return { error: err.message };
    }
  };
  return ArticleDetailPage;
};
