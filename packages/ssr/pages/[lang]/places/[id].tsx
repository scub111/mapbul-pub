import * as React from 'react';
import { withDetailPage, withLocale, IDetailPageConfig, IDetailPageProps } from 'hocs';
import { Marker } from 'models';
import { markersService } from 'services';
import { useTranslation } from 'hooks';
import { DetailPage, MarkerDetail } from 'components';

const View: React.FC<IDetailPageProps<Marker>> = ({ item, error }) => {
  const { isRus } = useTranslation();
  const nameLang = isRus ? item?.name : item?.nameEn || '';
  const introductionLang = isRus ? item?.introduction : item?.introductionEn || '';
  return (
    <DetailPage
      title={nameLang}
      description={introductionLang}
      imageUrl={item?.photo?.toString()}
      item={item}
      error={error}
      component={MarkerDetail}
    />
  );
};

const config: IDetailPageConfig<Marker> = {
  loadData: (id: string) => markersService.get(id),
};

export default withLocale(withDetailPage(config)(View));
