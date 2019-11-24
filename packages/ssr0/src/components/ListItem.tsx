import * as React from 'react';
import { IArticleDTO } from '@mapbul-pub/types';
import { IMAGE_URL } from '../common/constants';
import Link from 'next/link';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography, Hidden, CardMedia, CardActionArea } from '@material-ui/core';
import { clearUrl } from '../utils/urlUtils';

type Props = {
  item: IArticleDTO;
};

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      display: 'flex',
    },
    cardDetails: {
      flex: 1,
    },
    cardMedia: {
      // display: 'flex',
      width: 200,
      // height: 0,
      // paddingTop: '56.25%'
    },
  }),
);

const ListItem: React.FunctionComponent<Props> = ({ item }) => {
  const classes = useStyles();

  return (
    <Grid item key={item.title} xs={12} md={6}>
      <CardActionArea>
        <Link href={`/articles/[id]`} as={`/articles/${item.id}`}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {item.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {item.addedDate}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {item.description}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  Continue reading...
              </Typography>
              </CardContent>
            </div>
            {item.titlePhoto && (
              <Hidden xsDown>
                <CardMedia
                  className={classes.cardMedia}
                  // image="https://source.unsplash.com/random"
                  image={clearUrl(`${IMAGE_URL}/${item.titlePhoto}`)}
                  title={item.title}
                ></CardMedia>
              </Hidden>
            )}
          </Card>
        </Link>
      </CardActionArea>
    </Grid>
  );
};

export default ListItem;
