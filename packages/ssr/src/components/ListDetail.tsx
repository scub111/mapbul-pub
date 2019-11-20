import * as React from 'react'
import { IArticleDTO } from "@mapbul-pub/types"
import { IMAGE_URL } from '../common/constants';

type ListDetailProps = {
  item: IArticleDTO
}

const ListDetail: React.FunctionComponent<ListDetailProps> = ({ item }) => (
  <div>
    <h1>{item.title}</h1>
    <img src={`${IMAGE_URL}/${item.photo}`}></img>
    <p>ID: {item.id}</p>
  </div>
)

export default ListDetail
