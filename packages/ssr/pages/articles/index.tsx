import { ListPage, ITEMS_PER_PAGE } from 'components';
import { NextPage, NextPageContext } from 'next';
import { getQueryPage } from 'ssr/src/utils';
import { PageContent } from '@mapbul-pub/types';
import { Article } from 'ssr/src/models';
import { articlesService } from 'ssr/src/services';

type Props = {
  pagination?: PageContent<Article>;
  error?: string;
};

const ArticlesPage: NextPage<Props> = ({ pagination, error }) => {
  return <ListPage pagination={pagination} error={error} />;
};

ArticlesPage.getInitialProps = async ({ query }: NextPageContext) => {
  try {
    const queryPage = getQueryPage(query);
    const pagination: PageContent<Article> = await articlesService.list({
      page: queryPage,
      size: ITEMS_PER_PAGE,
      filter: 'StatusId = 2 AND StartDate is null',
      sort: 'PublishedDate desc',
    });
    return { pagination };
  } catch (err) {
    return { error: err.message };
  }
};

export default ArticlesPage;
