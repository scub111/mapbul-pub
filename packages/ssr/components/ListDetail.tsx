import * as React from 'react'
import { IArticleDTO } from "@mapbul-pub/types"

type ListDetailProps = {
  item: IArticleDTO
}

const ListDetail: React.FunctionComponent<ListDetailProps> = ({
  item: user,
}) => (
  <div>
    <h1>Detail for {user.title}</h1>
    <p>ID: {user.id}</p>
  </div>
)

export default ListDetail
