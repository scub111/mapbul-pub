import * as React from 'react';
import { withDetailPage, withLocale, IDetailPageConfig, IDetailPageProps } from 'hocs';
import { Article } from 'models';
import { articlesService } from 'services';
import { DetailPage } from 'components';

const View: React.FC<IDetailPageProps<Article>> = ({ item, error }) => {
  return <DetailPage item={item} error={error} />;
};

const config: IDetailPageConfig<Article> = {
  loadData: (id: string) => articlesService.get(id),
};

export default withLocale(withDetailPage(config)(View));
