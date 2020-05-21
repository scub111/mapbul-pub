import * as React from 'react';
import { ArticleListItem } from './ArticleListItem';
import { Grid } from '@material-ui/core';
import { Article } from '../models/Article';
import { CommonProps } from '@material-ui/core/OverridableComponent';
import { ListItemProps } from 'interfaces';

// export const List: React.FC<{ items: Array<Article>; route: string } & CommonProps<any>> = ({
//   items,
//   route,
//   ...props
// }) => {
//   return (
//     <Grid container spacing={2} {...props}>
//       {items.map((item: Article, index: number) => (
//         <ListItem key={index} item={item} route={route} />
//       ))}
//     </Grid>
//   );
// };

export const withList = <T extends object>({
  items,
  route,
  ...props
}: { items: Array<T>; route: string } & CommonProps<any>) => (Component: React.FC<{ item: T; route: string }>) => {
  return (
    <Grid container spacing={2} {...props}>
      {items.map((item: T, index: number) => (
        <Component key={index} item={item} route={route} />
      ))}
    </Grid>
  );
};

// export const List: React.FC<{ items: Array<Article>; route: string } & CommonProps<any>> = ({
//   items,
//   route,
//   ...props
// }) => withList({ items, route, ...props })(ListItem);

export const ListBase = <T extends object>({
  items,
  route,
  component: Component,
  ...props
}: { items: Array<T>; route: string; component: React.FC<ListItemProps<T>> } & CommonProps<any>) => {
  return (
    <Grid container spacing={2} {...props}>
      {items.map((item: T, index: number) => (
        <Component key={index} item={item} route={route} />
      ))}
    </Grid>
  );
};

export const ArticleList: React.FC<{ items: Array<Article>; route: string } & CommonProps<any>> = ({
  items,
  route,
  ...props
}) => ListBase({ items, route, component: ArticleListItem, ...props });
