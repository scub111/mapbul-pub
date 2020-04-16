import * as React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography, CardMedia, CardActionArea } from '@material-ui/core';
import { formatDateToString } from '@mapbul-pub/utils';
import { Article } from 'models';
import { useTranslation } from '../hooks';

const useStyles = makeStyles(() => ({
  typography: {
    // fontFamily: 'Raleway, Arial',
    fontSize: 6, //14 - default
  },
  card: {
    display: 'flex',
    // backgroundColor: 'red',
    // [theme.breakpoints.up("xs")]: {
    //   backgroundColor: theme.palette.primary.main
    // },
    // [theme.breakpoints.up("sm")]: {
    //   backgroundColor: "red"
    // },
    // [theme.breakpoints.up("md")]: {
    //   backgroundColor: "blue"
    // },
    // [theme.breakpoints.up("lg")]: {
    //   backgroundColor: green[500]
    // }
  },
  cardDetails: {
    // fontSize: 6,
    flex: 1,
    minWidth: '200px',
  },
  cardMedia: {
    width: '150px',
  },
}));

export const ListItem: React.FC<{ item: Article; route: string }> = ({ item, route }) => {
  const classes = useStyles();
  const { locale, isRus } = useTranslation();
  const titleLang = isRus ? item.title : item.titleEn || '';
  const descriptionLang = isRus ? item.description : item.descriptionEn || '';
  const publishedDate = route === 'articles' ? item.publishedDate : item.startDate;
  return (
    <Grid item key={item.title} xs={12} md={6}>
      <CardActionArea>
        <Link href={`/[lang]/${route}/[id]`} as={`/${locale}/${route}/${item.id}`}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
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
            {item.titlePhoto && <CardMedia className={classes.cardMedia} image={item.titlePhoto} title={titleLang} />}
          </Card>
        </Link>
      </CardActionArea>
      {/* <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => console.log('click')}
        >
          Submit
        </Button> */}
    </Grid>
  );
};
