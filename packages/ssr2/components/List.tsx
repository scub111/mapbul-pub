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
      <li key={item.show.id}>
        <ListItem data={item.show} />
      </li>
    ))}
  </ul>
)

export default List
