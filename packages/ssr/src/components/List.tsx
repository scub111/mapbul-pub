import * as React from 'react';
import ListItem from './ListItem';
import { IArticleDTO } from '@mapbul-pub/types';
import { Grid } from '@material-ui/core';

type Props = {
  items: Array<IArticleDTO>;
};

const List: React.FunctionComponent<Props> = ({ items }) => {
  return (
    <Grid container spacing={4}>
      {items.map((item: IArticleDTO, index: number) => (
        <ListItem key={index} item={item} />
      ))}
    </Grid>
  );
};

export default List;
