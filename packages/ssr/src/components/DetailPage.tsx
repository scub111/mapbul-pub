import * as React from 'react';
import { Article } from 'models';
import { PageLayout, ErrorText, Detail } from 'components';
import { useTranslation } from 'hooks';

export const DetailPage: React.FC<{
  item?: Article;
  error?: string;
}> = ({ item, error }) => {
  const { isRus } = useTranslation();
  return (
    // <PageLayout title={t('title')}>
    <PageLayout
      title={item?.title}
      description={isRus ? item?.description : item?.descriptionEn?.toString()}
      imageUrl={item?.titlePhoto?.toString()}
    >
      {error && <ErrorText error={error} />}
      {item && <Detail item={item} />}
    </PageLayout>
  );
};
