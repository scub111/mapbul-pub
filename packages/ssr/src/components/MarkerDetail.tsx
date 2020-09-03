import * as React from 'react';
import { Typography, Box, useTheme } from '@material-ui/core';
import { formatDateToString } from '@mapbul-pub/utils';
import { Marker } from 'models';
import { useTranslation } from 'hooks';
import { IDetailItemProps } from 'hocs';
import { MarkerMap } from '.';
import { PreText } from 'ui';

export const MarkerDetail: React.FC<IDetailItemProps<Marker>> = ({ item }) => {
  const theme = useTheme();
  const { isRus } = useTranslation();
  const nameLang = isRus ? item.name : item.nameEn || '';
  const descriptionLang = isRus ? item.description : item.descriptionEn || '';

  return (
    <Box style={{ padding: theme.spacing(0, 1) }}>
      <Box style={{ display: 'flex' }}>
        <Box style={{ flex: 1 }}>
          <Typography variant="h6">{item.category ? item.category.nameLang : ''}</Typography>
          {/* {item.userDescription && (
            <Typography variant="h6" color="textSecondary" style={{ paddingBottom: theme.spacing(2) }}>
              {item.userDescription ? item.userDescription.description : ''}
            </Typography>
          )} */}
          <Typography variant="h5" style={{ fontWeight: 600 }}>
            {nameLang}
          </Typography>
          <PreText text={descriptionLang} />
        </Box>
        {item.publishedDate && (
          <Box>
            <Typography variant="subtitle1" color="textSecondary">
              {formatDateToString(item.publishedDate)}
            </Typography>
          </Box>
        )}
      </Box>
      {item.photo && (
        <Box
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: theme.spacing(3) }}
        >
          <img style={{ maxWidth: '100%' }} src={item.photo} alt="" />
        </Box>
      )}
      {item.lat && item.lng && <MarkerMap item={item} />}
    </Box>
  );
};
