import * as React from 'react';
import { withRedux, useMarkers } from 'stores';
import { withPage, IPageProps, IPageConfig, withLocale } from 'hocs';
import { Routes } from 'constants/routes';
import { ListPage, ITEMS_PER_PAGE, MarkerListItem } from 'components';
import { Marker } from 'models';
import { loadMarkersData } from 'common';

const View: React.FC<IPageProps<Marker>> = ({ route, list, title, error, hasMore, loadMore }) => {
  return (
    <ListPage
      route={route}
      list={list}
      title={title}
      error={error}
      hasMore={hasMore}
      loadMore={loadMore}
      component={MarkerListItem}
    />
  );
};

const config: IPageConfig<Marker> = {
  route: Routes.events,
  loadData: loadMarkersData(ITEMS_PER_PAGE),
  useList: useMarkers,
};

export default withLocale(withRedux(withPage<Marker>(config)(View)));
