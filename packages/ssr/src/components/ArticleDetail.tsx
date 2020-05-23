import * as React from 'react';
import { Typography, Box, Link, useTheme } from '@material-ui/core';
import { formatDateToString } from '@mapbul-pub/utils';
import { Article } from 'models';
import { useTypeRoute, useTranslation } from 'hooks';
import { IDetailItemProps } from 'hocs';
import { PreText } from 'ui';

export const ArticleDetail: React.FC<IDetailItemProps<Article>> = ({ item }) => {
  const theme = useTheme();
  const { isRus } = useTranslation();
  const typeRoute = useTypeRoute();
  const isActicle = typeRoute === 'articles';

  return (
    <Box style={{ padding: theme.spacing(0, 1) }}>
      <Box style={{ display: 'flex' }}>
        <Box style={{ flex: 1 }}>
          <Typography variant="h6">{item.category ? item.category.nameLang : ''}</Typography>
          {isActicle && item.userDescription && !item.sourceUrl && (
            <Typography variant="h6" color="textSecondary" style={{ paddingBottom: theme.spacing(2) }}>
              {item.userDescription ? item.userDescription.description : ''}
            </Typography>
          )}
          {item.sourceUrl && (
            <Link display="block" variant="body1" href={item.sourceUrl} key={item.sourceUrl}>
              {item.sourceUrl}
            </Link>
          )}
          <Typography variant="h5" style={{ fontWeight: 600 }}>
            {isRus ? item.title : item.titleEn}
          </Typography>
          <Typography variant="subtitle1" paragraph component="h1">
            {isRus ? item.description : item.descriptionEn}
          </Typography>
        </Box>
        {item.publishedDate && (
          <Box>
            <Typography variant="subtitle1" color="textSecondary">
              {formatDateToString(isActicle ? item.publishedDate : item.startDate)}
            </Typography>
          </Box>
        )}
      </Box>
      {item.titlePhoto && (
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img style={{ maxWidth: '100%' }} src={item.titlePhoto} title={item.title} alt="" />
        </Box>
      )}
      <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box style={{ display: 'flex', flexDirection: 'row', fontStyle: 'italic' }}>
          {item.sourcePhoto && (
            <Link display="block" variant="body1" href={item.sourcePhoto} key={item.sourcePhoto}>
              {isRus ? item.sourcePhoto : item.sourcePhotoEn}
            </Link>
          )}
        </Box>
      </Box>
      <Typography component="div" variant="subtitle1" paragraph>
        <PreText text={isRus ? item.text : item.textEn} />
        {!isActicle && item.userDescription && !item.sourceUrl && (
          <Typography variant="h6" color="textSecondary" style={{ paddingBottom: theme.spacing(2) }}>
            {item.userDescription ? item.userDescription.description : ''}
          </Typography>
        )}
      </Typography>
      {item.photo && (
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* <Typography variant="subtitle1" paragraph>
            Фото
          </Typography> */}
          <img style={{ maxWidth: '100%' }} src={item.photo} title={item.title} alt="" />
        </Box>
      )}
    </Box>
  );
};
