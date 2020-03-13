import * as React from 'react';
import { ListItem } from './ListItem';
import { Grid } from '@material-ui/core';
import { Article } from '../models/Article';
import { CommonProps } from '@material-ui/core/OverridableComponent';

export const List: React.FC<{ items: Array<Article>; route: string  } & CommonProps<any>> = ({ items, route, ...props }) => {
  return (
    <Grid container spacing={2} {...props}>
      {items.map((item: Article, index: number) => (
        <ListItem key={index} item={item} route={route} />
      ))}
    </Grid>
  );
};
