import * as React from 'react';
import { FieldProps } from 'types';
import { Edit } from 'react-admin';

export const withEditPage = <T extends object>(Component: React.FC<FieldProps<T>>) => {
   const EditPage: React.FC = (props: any) => {
      const { hasList, hasEdit, hasShow, hasCreate, ...rest } = props;
      return (
         // <Edit title={<div> Hello</div>} undoable={false} {...props}>
         <Edit undoable={false} {...props} >
            <Component {...rest} isEdit />
         </Edit>
      );
   };
   return EditPage;
};
