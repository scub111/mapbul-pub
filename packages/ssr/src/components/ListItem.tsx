import * as React from 'react'
import { IArticleDTO } from "@mapbul-pub/types"
import { IMAGE_URL } from '../common/constants';
import Link from '../Link';
import { Grid, CardActionArea, Card, CardContent, Typography, Hidden, CardMedia, makeStyles } from '@material-ui/core';
import { clearUrl } from '../utils/urlUtils';

type Props = {
  item: IArticleDTO
}

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));

const ListItem: React.FunctionComponent<Props> = ({ item }) => {
  const classes = useStyles();

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Link href="/articles/[id]" as={`/articles/${item.id}`}>
        <Grid item key={item.title} xs={12} md={6}>
          <CardActionArea component="a" href="#">
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
                    // image="https://source.unsplash.com/random2"
                    image={clearUrl(`${IMAGE_URL}/${item.titlePhoto}`)}
                    title="Image title"
                  />
                </Hidden>
              )}
            </Card>
          </CardActionArea>
        </Grid>
      </Link>
    </div>
  )
}

export default ListItem
