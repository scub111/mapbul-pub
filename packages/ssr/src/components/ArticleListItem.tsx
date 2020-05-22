import * as React from 'react';
import Link from 'next/link';
import { Grid, Card, CardContent, Typography, CardMedia, CardActionArea } from '@material-ui/core';
import { formatDateToString } from '@mapbul-pub/utils';
import { Article } from 'models';
import { useTranslation } from '../hooks';
import { Link as MuiLink } from '@material-ui/core';
import { ListItemProps } from 'hocs';

export const ArticleListItem: React.FC<ListItemProps<Article>> = ({ item, route }) => {
  const { locale, isRus } = useTranslation();
  const titleLang = isRus ? item.title : item.titleEn || '';
  const descriptionLang = isRus ? item.description : item.descriptionEn || '';
  const publishedDate = route === 'articles' ? item.publishedDate : item.startDate;
  const href = `/${locale}/${route}/${item.id}`;
  return (
    <Grid item key={item.title} xs={12} md={6}>
      <CardActionArea>
        <Link href={`/[lang]/${route}/[id]`} as={href}>
          <MuiLink color="inherit" href={href}>
            <Card style={{ display: 'flex' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <CardContent>
                  <Typography variant="h5">{titleLang}</Typography>
                  {true && (
                    <Typography variant="subtitle1" color="textSecondary">
                      {formatDateToString(publishedDate)}
                    </Typography>
                  )}
                  <Typography variant="subtitle1" paragraph>
                    {descriptionLang}
                  </Typography>
                </CardContent>
              </div>
              {item.titlePhoto && (
                <CardMedia image={item.titlePhoto} title={titleLang} style={{ width: '30%', minWidth: 150 }} />
              )}
            </Card>
          </MuiLink>
        </Link>
      </CardActionArea>
    </Grid>
  );
};
