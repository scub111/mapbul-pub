import * as React from 'react';
import { ListItem } from './ListItem';
import { Grid } from '@material-ui/core';
import { Article } from '../models/Article';
import { createRouter } from 'next/router';

export const List: React.FC<{ items: Array<Article>; route: string; }> = ({ items, route }) => {
  return (
    <Grid container spacing={2}>
      {items.map((item: Article, index: number) => (
        <ListItem key={index} item={item} route={route}/>
      ))}
    </Grid>
  );
};
createRouter