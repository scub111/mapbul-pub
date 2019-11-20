import * as React from 'react'
import Link from 'next/link'
import { IArticleDTO } from "@mapbul-pub/types"
import { IMAGE_URL } from '../common/constants';

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
      <a>
        {item.id}: {item.title}
      </a>
    </Link>
  </div>
)

export default ListItem
