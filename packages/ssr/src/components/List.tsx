import * as React from 'react';
import ListItem from './ListItem';
import { IArticleDTO } from '@mapbul-pub/types';
import { Container, Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

type Props = {
  items: Array<IArticleDTO>;
};

const List: React.FunctionComponent<Props> = ({ items }) => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {items.map((item: IArticleDTO, index: number) => (
            <ListItem key={index} item={item} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default List;
