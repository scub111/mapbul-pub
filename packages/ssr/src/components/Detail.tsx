import * as React from 'react';
import { makeStyles, Typography, Box, Link } from '@material-ui/core';
import { formatDateToString } from '@mapbul-pub/utils';
import { Article } from 'models';
import { useTypeRoute } from 'utils';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, 1),
  },
  articleUserDescription: {
    paddingBottom: theme.spacing(2),
  },
  eventUserDescription: {
    paddingBottom: theme.spacing(2),
  },
  imgCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const PreText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <>
      {text.split('\r\n').map((item, index) => (
        <Typography key={index} variant="subtitle1">
          {item}
        </Typography>
      ))}
    </>
  );
};

export const Detail: React.FC<{ item: Article }> = ({ item }) => {
  const classes = useStyles();
  const typeRoute = useTypeRoute();
  const isActicle = typeRoute === 'articles';
  return (
    <Box className={classes.root}>
      <Box style={{ display: 'flex' }}>
        <Box style={{ flex: 1 }}>
          <Typography variant="h6">{item.category ? item.category.name : ''}</Typography>
          {isActicle && item.userDescription && !item.sourceUrl && (
            <Typography variant="h6" color="textSecondary" className={classes.articleUserDescription}>
              {item.userDescription ? item.userDescription.description : ''}
            </Typography>
          )}
          {item.sourceUrl && (
            <Link display="block" variant="body1" href={item.sourceUrl} key={item.sourceUrl}>
              {item.sourceUrl}
            </Link>
          )}
          <Typography variant="h5" style={{ fontWeight: 600 }}>
            {item.title}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {item.description}
          </Typography>
        </Box>
        {item.publishedDate && (
          <Box>
            <Typography variant="subtitle1" color="textSecondary">
              {formatDateToString(isActicle ? item.publishedDate : item.startDate)}
            </Typography>
          </Box>
        )}
      </Box>
      {item.titlePhoto && (
        <Box className={classes.imgCenter}>
          <img style={{ maxWidth: '100%' }} src={item.titlePhoto} title={item.title} />
        </Box>
      )}
      <Box className={classes.imgCenter}>
        <Box style={{ display: 'flex', flexDirection: 'row', fontStyle: 'italic' }}>
          {item.sourcePhoto && (
            <Link display="block" variant="body1" href={item.sourcePhoto} key={item.sourcePhoto}>
              {item.sourcePhoto}
            </Link>
          )}
        </Box>
      </Box>
      <Typography component="div" variant="subtitle1" paragraph>
        <PreText text={item.text} />
        {!isActicle && item.userDescription && !item.sourceUrl && (
          <Typography variant="h6" color="textSecondary" className={classes.eventUserDescription}>
            {item.userDescription ? item.userDescription.description : ''}
          </Typography>
        )}
      </Typography>
      {item.photo && (
        <Box className={classes.imgCenter}>
          {/* <Typography variant="subtitle1" paragraph>
            Фото
          </Typography> */}
          <img style={{ maxWidth: '100%' }} src={item.photo} title={item.title} />
        </Box>
      )}
    </Box>
  );
};
