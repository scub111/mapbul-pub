import * as React from 'react'
import ListItem from './ListItem'
import { IArticleDTO } from "@mapbul-pub/types"
import { Container, Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';


// import Blog from '../../pages/blog';

type Props = {
  items: Array<IArticleDTO>
}

const featuredPosts = [
  {
    title: 'Featured post 1',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
  },
  {
    title: 'Post title 2',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
  },
];

const List: React.FunctionComponent<Props> = () => {
  return (
    <>
      {/* <Blog/> */}
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* {items.map((item: IArticleDTO) => (
            <ListItem item={item} />
          ))} */}

          {featuredPosts.map(post => (
            <ListItem item={post} />
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default List
