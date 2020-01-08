import { ListPage, ITEMS_PER_PAGE, ListPageProps } from 'components';
import { NextPage, NextPageContext } from 'next';
import { getQueryPage } from 'ssr/src/utils';
import { PageContent } from '@mapbul-pub/types';
import { Article } from 'ssr/src/models';
import { articlesService } from 'ssr/src/services';
import { Routes } from 'ssr/src/constants';

const ArticlesPage: NextPage<ListPageProps> = ({ pagination, error }) => {
  return <ListPage pagination={pagination} route={Routes.articles} error={error} loadData={loadData}/>;
};

const loadData = async (page: number): Promise<ListPageProps> => {
  try {
    const pagination: PageContent<Article> = await articlesService.list({
      page: page,
      size: ITEMS_PER_PAGE,
      filter: 'StatusId = 2 AND StartDate is null',
      sort: 'PublishedDate desc',
    });
    return { pagination };
  } catch (err) {
    return { error: err.message };
  }
}

ArticlesPage.getInitialProps = async ({ query }: NextPageContext) => {
  const queryPage = getQueryPage(query);
  // try {
  //   const pagination: PageContent<Article> = await articlesService.list({
  //     page: queryPage,
  //     size: ITEMS_PER_PAGE,
  //     filter: 'StatusId = 2 AND StartDate is null',
  //     sort: 'PublishedDate desc',
  //   });
  //   return { pagination };
  // } catch (err) {
  //   return { error: err.message };
  // }

  return loadData(queryPage);
};

export default ArticlesPage;
