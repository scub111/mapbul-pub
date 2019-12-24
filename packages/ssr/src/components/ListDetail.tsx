import * as React from 'react';
import { makeStyles, Typography, Box } from '@material-ui/core';
import { formatDateToString } from '@mapbul-pub/utils'
import { Article } from 'models';

const useStyles = makeStyles(() => ({
  imgCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

type ListDetailProps = {
  item: Article;
};

export const ListDetail: React.FC<ListDetailProps> = ({ item }) => {
  const classes = useStyles();
  return (
    <Box style={{ padding: '0 30px' }}>
      <Box style={{ display: 'flex' }}>
        <Box style={{ flex: 1 }}>
          <Typography component="h2" variant="h6">
            {item.category ? item.category.name : ''}
          </Typography>
          <Box style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography component="h2" variant="h6" style={{ paddingRight: '30px' }}>
              {item.userDescription ? item.userDescription.description : ''}
            </Typography>
            <Typography component="h2" variant="h6">
              {item.sourceUrl}
            </Typography>
          </Box>
          <Typography component="h2" variant="h5" style={{ fontWeight: 600 }}>
            {item.title}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {item.description}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" color="textSecondary">
            {formatDateToString(item.publishedDate)}
          </Typography>
        </Box>
      </Box>
      {item.titlePhoto && (
        <Box className={classes.imgCenter}>
          <img style={{ width: '200px' }} src={item.titlePhoto} title={item.title} />
        </Box>
      )}
      <Typography variant="subtitle1" paragraph>
        {item.text}
      </Typography>
      {item.photo && (
        <Box className={classes.imgCenter}>
          {/* <Typography variant="subtitle1" paragraph>
            Фото
          </Typography> */}
          <img style={{ width: '500px' }} src={item.photo} title={item.title} />
        </Box>
      )}
    </Box>
  );
};