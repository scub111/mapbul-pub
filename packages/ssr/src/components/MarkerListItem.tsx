import * as React from 'react';
import Link from 'next/link';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@material-ui/core';
import { formatDateToString } from '@mapbul-pub/utils';
import { Marker } from 'models';
import { useTranslation } from '../hooks';
import { Link as MuiLink } from '@material-ui/core';
import { ListItemProps } from 'hocs';

export const MarkerListItem: React.FC<ListItemProps<Marker>> = ({ item, route }) => {
  const { locale, isRus } = useTranslation();
  const descriptionLang = isRus ? item.description : item.descriptionEn || '';
  const href = `/${locale}/${route}/${item.id}`;
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea>
        <Link href={`/[lang]/${route}/[id]`} as={href}>
          <MuiLink color="inherit" href={href}>
            <Card style={{ display: 'flex' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <CardContent>
                  {true && (
                    <Typography variant="subtitle1" color="textSecondary">
                      {formatDateToString(item.publishedDate)}
                    </Typography>
                  )}
                  <Typography variant="subtitle1" paragraph>
                    {descriptionLang}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          </MuiLink>
        </Link>
      </CardActionArea>
    </Grid>
  );
};
