import * as React from 'react';
import { withDetailPage, withLocale, IDetailPageConfig, IDetailPageProps } from 'hocs';
import { Marker } from 'models';
import { markersService } from 'services';
//import { useTranslation } from 'hooks';
import { DetailPage, MarkerDetail } from 'components';

const View: React.FC<IDetailPageProps<Marker>> = ({ item, error }) => {
  // const { isRus } = useTranslation();
  return (
    <DetailPage
      title="Marker"
      //title={isRus ? item?.title : item?.titleEn?.toString()}
      //description={isRus ? item?.description : item?.descriptionEn?.toString()}
      //imageUrl={item?.titlePhoto?.toString()}
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
