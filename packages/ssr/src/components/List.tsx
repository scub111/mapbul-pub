import * as React from 'react';
import ListItem from './ListItem';
import { Grid } from '@material-ui/core';
import { Article } from '../models/Article';

type Props = {
  items: Array<Article>;
};

const List: React.FunctionComponent<Props> = ({ items }) => {
  return (
    <Grid container spacing={4}>
      {items.map((item: Article, index: number) => (
        <ListItem key={index} item={item} />
      ))}
    </Grid>
  );
};

export default List;
