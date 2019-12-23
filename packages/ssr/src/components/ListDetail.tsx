import * as React from 'react';
import { makeStyles, Typography, Box } from '@material-ui/core';
import { formatDateToString } from '@mapbul-pub/utils'
import { Article } from 'models';

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 200,
    alignItems: 'center'
  },
}));

type ListDetailProps = {
  item: Article;
};

export const ListDetail: React.FC<ListDetailProps> = ({ item }) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.card}>
        <Box className={classes.cardDetails}>
          <Typography component="h2" variant="h6">
            {item.category ? item.category.name : ''}
          </Typography>
          <Typography component="h2" variant="h6">
            {item.userDescription ? item.userDescription.description : ''}
          </Typography>
          <Typography component="h2" variant="h5">
            {item.title}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {item.description}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {item.text}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" color="textSecondary">
            {formatDateToString(item.publishedDate)}
          </Typography>
        </Box>
      </Box>
      {item.titlePhoto && (
        <Box style={{display: 'flex' }}>
          <img className={classes.cardMedia} src={item.titlePhoto} title={item.title} />
        </Box>
      )}
      {item.photo && (
        <Box>
          {/* <Typography variant="subtitle1" paragraph>
            Фото
          </Typography> */}
          <img className={classes.cardMedia} src={item.photo} title={item.title} />
        </Box>
      )}
    </>
  );
};