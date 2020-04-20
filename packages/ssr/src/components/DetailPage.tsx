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
      title={isRus ? item?.description : item?.descriptionEn?.toString()}
      description={item?.title}
      imageUrl={item?.titlePhoto?.toString()}
    >
      {error && <ErrorText error={error} />}
      {item && <Detail item={item} />}
    </PageLayout>
  );
};
