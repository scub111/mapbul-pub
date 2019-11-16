import * as React from 'react'
import Link from 'next/link'
import { IArticleDTO } from "@mapbul-pub/types"

type Props = {
  data: IArticleDTO
}

const ListItem: React.FunctionComponent<Props> = ({ data }) => (
  <Link href="/articles/[id]" as={`/articles/${data.id}`}>
    <a>
      {data.id}: {data.title}
    </a>
  </Link>
)

export default ListItem
