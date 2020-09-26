import * as React from 'react';
import { FieldProps } from 'types';
import { Create } from 'react-admin';

export const withCreatePage = <T extends object>(Component: React.FC<FieldProps<T>>) => {
   const EditPage: React.FC = (props: any) => {
      const { hasList, hasEdit, hasShow, hasCreate, ...rest } = props;
      return (
         <Create title={''} {...props}>
            <Component {...rest} isEdit={false} />
         </Create>
      );
   };
   return EditPage;
};
