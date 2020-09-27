import * as React from 'react';
import Link from 'next/link';
import { Grid, Card, CardContent, Typography, CardActionArea, CardMedia } from '@material-ui/core';
import { formatDateToString } from '@mapbul-pub/utils';
import { Marker } from 'models';
import { useTranslation } from '../hooks';
import { Link as MuiLink } from '@material-ui/core';
import { ListItemProps } from 'hocs';

export const MarkerListItem: React.FC<ListItemProps<Marker>> = ({ item, route }) => {
  const { locale, isRus } = useTranslation();
  const nameLang = isRus ? item.name : item.nameEn || '';
  const introductionLang = isRus ? item.introduction : item.introductionEn || '';
  const href = `/${locale}/${route}/${item.id}`;
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea>
        <Link href={`/[lang]/${route}/[id]`} as={href}>
          <MuiLink color="inherit" href={href}>
            <Card style={{ display: 'flex' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <CardContent>
                  <Typography variant="h5">{nameLang}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {formatDateToString(item.publishedDate)}
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {introductionLang}
                  </Typography>
                </CardContent>
              </div>
              {item.photo && (
                <CardMedia
                  image={item.photo}
                  title={nameLang}
                  style={{ width: '30%', minWidth: 150 }}
                />
              )}
            </Card>
          </MuiLink>
        </Link>
      </CardActionArea>
    </Grid>
  );
};
