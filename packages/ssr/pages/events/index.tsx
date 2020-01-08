import { ListPage, ITEMS_PER_PAGE } from 'components';
import { NextPage, NextPageContext } from 'next';
import { getQueryPage } from 'utils';
import { PageContent } from '@mapbul-pub/types';
import { Article } from 'models';
import { articlesService } from 'services';
import { Routes } from 'ssr/src/constants';

type Props = {
  pagination?: PageContent<Article>;
  error?: string;
};

const EventsPage: NextPage<Props> = ({ pagination, error }) => {
  return <ListPage pagination={pagination} route={Routes.events} error={error} />;
};

EventsPage.getInitialProps = async ({ query }: NextPageContext) => {
  try {
    const queryPage = getQueryPage(query);
    const pagination: PageContent<Article> = await articlesService.list({
      page: queryPage,
      size: ITEMS_PER_PAGE,
      filter: 'StatusId = 2 AND StartDate is not null AND EndDate is null',
      sort: 'PublishedDate desc',
    });
    return { pagination };
  } catch (err) {
    return { error: err.message };
  }
};

export default EventsPage;
