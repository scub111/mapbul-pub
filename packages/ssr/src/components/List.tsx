import * as React from 'react'
import ListItem from './ListItem'
import { IArticleDTO } from "@mapbul-pub/types"

type Props = {
  items: Array<IArticleDTO>
}

const List: React.FunctionComponent<Props> = ({ items }) => 
<>
    {items.map((item: IArticleDTO) => (
      <ListItem item={item} />
    ))}
</>

export default List
