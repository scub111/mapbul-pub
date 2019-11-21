import * as React from 'react'
import { IArticleDTO } from "@mapbul-pub/types"
import { IMAGE_URL } from '../common/constants';
import Link from '../Link';

type Props = {
  item: IArticleDTO
}

const ListItem: React.FunctionComponent<Props> = ({ item }) => (
  <div style={{display: 'flex', alignItems: 'center'}}>
    {item.titlePhoto && (
        <Link href="/articles/[id]" as={`/articles/${item.id}`} >
          <img src={`${IMAGE_URL}/${item.titlePhoto}`} style={{marginRight: '20px'}}/>
        </Link>
      )
    }
    <Link href="/articles/[id]" as={`/articles/${item.id}`}>
        {item.id}: {item.title}
    </Link>
  </div>
)

export default ListItem
