import * as React from 'react'
import ListItem from './ListItem'
// import { IEditorsDTO } from "@mapbul-pub/types"

type Props = {
  // items: IEditorsDTO[]
  items: any
}

const List: React.FunctionComponent<Props> = ({ items }) => (
  <ul>
    {items.map((item: any) => (
      <li key={item.id}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
)

export default List
