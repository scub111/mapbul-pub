import * as React from 'react';
import { withDetailPage, withLocale, IDetailPageConfig, IDetailPageProps } from 'hocs';
import { Marker } from 'models';
import { markersService } from 'services';
import { useTranslation } from 'hooks';
import { DetailPage, MarkerDetail } from 'components';

const View: React.FC<IDetailPageProps<Marker>> = ({ item, error }) => {
  const { isRus } = useTranslation();
  const nameLang = isRus ? item?.name : item?.nameEn || '';
  const descriptionLang = isRus ? item?.description : item?.descriptionEn || '';
  return (
    <DetailPage
      title={nameLang}
      description={descriptionLang}
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
