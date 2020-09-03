import * as React from 'react';
import { PageLayout, ErrorText } from 'components';

import { IDetailPageProps } from 'hocs';

export const DetailPage = <T extends object>({
  title,
  description,
  imageUrl,
  item,
  error,
  component: Component,
}: IDetailPageProps<T>) => {
  // const { isRus } = useTranslation();
  return (
    // <PageLayout
    //   title={isRus ? item?.title : item?.titleEn?.toString()}
    //   description={isRus ? item?.description : item?.descriptionEn?.toString()}
    //   imageUrl={item?.titlePhoto?.toString()}
    // >
    <PageLayout title={title} description={description} imageUrl={imageUrl}>
      {error && <ErrorText error={error} />}
      {item && Component && <Component item={item} />}
    </PageLayout>
  );
};
