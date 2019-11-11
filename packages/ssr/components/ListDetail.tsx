import * as React from 'react';
import { IEditorsDTO } from '@mapbul-pub/types';

type ListDetailProps = {
  item: IEditorsDTO;
};

const ListDetail: React.FunctionComponent<ListDetailProps> = ({ item: user }) => (
  <div>
    <h1>Detail for {user.lastName}</h1>
    <h2>Detail for {user.firstName}</h2>
    <p>ID: {user.id}</p>
  </div>
);

export default ListDetail;
