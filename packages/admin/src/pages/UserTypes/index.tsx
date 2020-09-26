import * as React from 'react';
import { List, TextField, SimpleForm, TextInput, required } from 'react-admin';
import { P } from '@mapbul-pub/utils';
import { SortedGrid } from 'components';
import { RowLayout } from 'ui';
import { withCreatePage, withEditPage } from 'hocs';
import { IUserTypeDTO } from '@mapbul-pub/types';
import { FieldProps } from 'src/types';

export const UserTypeList: React.FC = (props: any) => {
   return (
      <List title="All Usertypes" {...props}>
         <SortedGrid {...props}>
            <TextField source={P<IUserTypeDTO>((p) => p.id)} />
            <TextField source={P<IUserTypeDTO>((p) => p.tag)} />
            <TextField source={P<IUserTypeDTO>((p) => p.description)} />
         </SortedGrid>
      </List>
   );
};

const CommonForm: React.FC<FieldProps<IUserTypeDTO>> = (props) => {
   return (
      <SimpleForm {...props} redirect="list">
         <RowLayout>
            <TextInput disabled source={P<IUserTypeDTO>((p) => p.id)} fullWidth />
            <TextInput source={P<IUserTypeDTO>((p) => p.tag)} fullWidth validate={required()} />
         </RowLayout>
         <RowLayout>
            <TextInput disabled source={P<IUserTypeDTO>((p) => p.description)} fullWidth />
         </RowLayout>
      </SimpleForm>
   );
};

export const UserTypeCreate: React.FC = withCreatePage(CommonForm);

export const UserTypeEdit = withEditPage<IUserTypeDTO>(CommonForm);
