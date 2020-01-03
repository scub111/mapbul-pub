import * as React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography, CardMedia, CardActionArea } from '@material-ui/core';
import { formatDateToString } from '@mapbul-pub/utils';
import { Article } from 'models';

type Props = {
  item: Article;
};

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 200,
  },
}));

export const ListItem: React.FC<Props> = ({ item }) => {
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
                {item.publishedDate &&
                  <Typography variant="subtitle1" color="textSecondary">
                    {formatDateToString(item.publishedDate)}
                  </Typography>
                }
                <Typography variant="subtitle1" paragraph>
                  {item.description}
                </Typography>
              </CardContent>
            </div>
            {item.titlePhoto && <CardMedia className={classes.cardMedia} image={item.titlePhoto} title={item.title} />}
          </Card>
        </Link>
      </CardActionArea>
    </Grid>
  );
};
