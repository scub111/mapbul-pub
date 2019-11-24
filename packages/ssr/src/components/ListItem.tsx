import * as React from 'react';
import Link from 'next/link';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { IArticleDTO } from "@mapbul-pub/types"
import { IMAGE_URL } from '../common/constants';
import { Grid, Card, CardContent, Typography, Hidden, CardMedia, CardActionArea } from '@material-ui/core';
import { clearUrl } from '../utils/urlUtils';

type Props = {
  item: IArticleDTO
}

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
  // console.log('render');
  return (
    // <div style={{display: 'flex', alignItems: 'center'}}>
    // {item.titlePhoto && (
    //     <Link href="/articles/[id]" as={`/articles/${item.id}`} >
    //       <img src={`${IMAGE_URL}/${item.titlePhoto}`} style={{marginRight: '20px'}}/>
    //     </Link>
    //   )
    // }
    // <Link href="/articles/[id]" as={`/articles/${item.id}`}>
    //   <a>
    //     {item.id}: {item.title}
    //   </a>
    // </Link>
    // </div>
    <Grid item key={item.title} xs={12} md={6}>
      {item.titlePhoto && (
        <Link href="/articles/[id]" as={`/articles/${item.id}`} >
          <img src={`${IMAGE_URL}/${item.titlePhoto}`} style={{ marginRight: '20px' }} />
        </Link>
      )
      }
      <Link href="/articles/[id]" as={`/articles/${item.id}`}>
        <a>
          {item.id}: {item.title}
        </a>
      </Link>
      {/* <Button control={<Link/>} href={`/articles/[id]`} as={`/articles/${item.id}`} disabled>
        Test
      </Button> */}
      <CardActionArea>
      {/* <CardActionArea component={() => <Link href={`/articles/[id]`} as={`/articles/${item.id}`}/>}> */}
      {/* <CardActionArea component={() => <a></a>}> */}
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
}

export default ListItem
