import * as React from 'react';
import { Article } from 'models';
import { PageLayout, ErrorText, Detail } from 'components';

export const DetailPage: React.FC<{
  item?: Article;
  error?: string;
}> = ({ item, error }) => {
  return (
    <PageLayout title="X-island. Детали статьи">
      {error && <ErrorText error={error} />}
      {item && <Detail item={item} />}
    </PageLayout>
  );
};
