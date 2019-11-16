import * as React from 'react';
import Link from 'next/link';
import { IEditorsDTO } from '@mapbul-pub/types';

type Props = {
  data: IEditorsDTO;
};

const ListItem: React.FunctionComponent<Props> = ({ data }) => (
  <Link href="/editors/[id]" as={`/editors/${data.id}`}>
    <a>
      {data.id}: {data.lastName}
    </a>
  </Link>
);

export default ListItem;
