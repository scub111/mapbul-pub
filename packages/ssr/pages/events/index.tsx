import * as React from 'react';
import { withRedux, useEvents } from 'stores';
import { withPage, IPageProps, IPageConfig } from 'hocs';
import { Routes } from 'constants/routes';
import { ListPage, ITEMS_PER_PAGE } from 'components';
import { Article } from 'models';
import { loadEventsData } from 'common';

const View: React.FC<IPageProps<Article>> = ({ route, list, title, error, hasMore, loadMore }) => {
  return <ListPage route={route} list={list} title={title} error={error} hasMore={hasMore} loadMore={loadMore} />;
};

const config: IPageConfig<Article> = {
  route: Routes.events,
  title: 'X-island. События',
  loadData: loadEventsData(ITEMS_PER_PAGE),
  useList: useEvents,
};

export default withRedux(withPage<Article>(config)(View));
