import * as React from 'react';
import ListItem from './ListItem';
import { IArticleDTO } from '@mapbul-pub/types';

type Props = {
  items: Array<IArticleDTO>;
};

const List: React.FunctionComponent<Props> = ({ items }) => (
  <ul>
    {items.map(item => (
      <li key={item.id}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
);

export default List;
