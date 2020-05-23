import * as React from 'react';
import { withDetailPage, withLocale, IDetailPageConfig, IDetailPageProps } from 'hocs';
import { Article } from 'models';
import { articlesService } from 'services';
import { useTranslation } from 'hooks';
import { DetailPage, ArticleDetail } from 'components';

const View: React.FC<IDetailPageProps<Article>> = ({ item, error }) => {
  const { isRus } = useTranslation();
  const titleLang = isRus ? item?.title : item?.titleEn || '';
  const descriptionLang = isRus ? item?.description : item?.descriptionEn || '';
  return (
    <DetailPage
      title={titleLang}
      description={descriptionLang}
      imageUrl={item?.titlePhoto?.toString()}
      item={item}
      error={error}
      component={ArticleDetail}
    />
  );
};

const config: IDetailPageConfig<Article> = {
  loadData: (id: string) => articlesService.get(id),
};

export default withLocale(withDetailPage(config)(View));
