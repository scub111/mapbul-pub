import * as React from 'react';
import { IArticleDTO } from '@mapbul-pub/types';
import { makeStyles, Typography, Box } from '@material-ui/core';
import { formatDateToString } from '@mapbul-pub/utils'

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

type ListDetailProps = {
  item: IArticleDTO;
};

const ListDetail: React.FunctionComponent<ListDetailProps> = ({ item }) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.card}>
        <Box className={classes.cardDetails}>
          <Typography component="h2" variant="h5">
            {item.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {formatDateToString(item.publishedDate)}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {item.description}
          </Typography>
        </Box>
        {item.titlePhoto && (
          <img className={classes.cardMedia} src={item.titlePhoto} title={item.title} />
        )}
      </Box>
      {item.photo && (
        <Box>
          <Typography variant="subtitle1" paragraph>
            Фото
          </Typography>
          <img className={classes.cardMedia} src={item.photo} title={item.title} />
        </Box>
      )}
    </>
  );
};

export default ListDetail;
