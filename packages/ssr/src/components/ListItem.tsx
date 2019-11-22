import * as React from 'react'
// import { IArticleDTO } from "@mapbul-pub/types"
// import { IMAGE_URL } from '../common/constants';
// import Link from '../Link';
import { Grid, CardActionArea, Card, CardContent, Typography, Hidden, CardMedia, makeStyles } from '@material-ui/core';
// import { clearUrl } from '../utils/urlUtils';

type Props = {
  // item: IArticleDTO
  item: any
}

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
}));

const ListItem: React.FunctionComponent<Props> = ({ item }) => {
  const classes = useStyles();

  return (
    <Grid item key={item.title} xs={12} md={6}>
    <CardActionArea component="a" href="#">
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5">
              {item.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {item.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {item.description}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
        </div>
        <Hidden xsDown>
          <CardMedia
            className={classes.cardMedia}
            image="https://source.unsplash.com/random"
            title="Image title"
          />
        </Hidden>
      </Card>
    </CardActionArea>
    </Grid>
  )
}

export default ListItem
