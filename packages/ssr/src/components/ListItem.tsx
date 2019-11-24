import * as React from 'react';
import Link from 'next/link';
// import { formatDateToString } from "@mapbul-pub/common"
import { IArticleDTO } from '@mapbul-pub/types';
import { IMAGE_URL } from '../common/constants';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography, CardMedia, CardActionArea } from '@material-ui/core';
import { clearUrl } from '../utils/urlUtils';
// import { formatDateToString } from '../utils/dateUtils';

type Props = {
  item: IArticleDTO;
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
              </CardContent>
            </div>
            {item.titlePhoto && (
              <CardMedia
                className={classes.cardMedia}
                image={clearUrl(`${IMAGE_URL}/${item.titlePhoto}`)}
                title={item.title}
              />
            )}
          </Card>
        </Link>
      </CardActionArea>
    </Grid>
  );
};

export default ListItem;
