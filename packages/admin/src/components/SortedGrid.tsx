import * as React from 'react';
import { Datagrid, useListSortContext } from 'react-admin';
import { useEffect } from 'react';
import { ICategoryDTOEx } from 'interfaces';
import { P } from '@mapbul-pub/utils';

export const SortedGrid: React.FC = (props: any) => {
   const { children } = props;
   const { currentSort, setSort } = useListSortContext();

   useEffect(() => {
      if (currentSort.field === P<ICategoryDTOEx>((p) => p.id) && currentSort.order === 'ASC') {
         setSort(
            P<ICategoryDTOEx>((p) => p.id),
            'DESC'
         );
      }
   }, []);

   return (
      <Datagrid rowClick="edit" {...props}>
         {children}
      </Datagrid>
   );
};
