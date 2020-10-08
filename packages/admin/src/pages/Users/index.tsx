import * as React from 'react';
import {
   List,
   TextField,
   SimpleForm,
   TextInput,
   ReferenceField,
   ReferenceInput,
   SelectInput,
   DateTimeInput,
   required
} from 'react-admin';
import { P } from '@mapbul-pub/utils';
import { SortedGrid } from 'components';
import { RowLayout } from 'ui';
import { withCreatePage, withEditPage } from 'hocs';
import { IUserDTO, IUserTypeDTO } from '@mapbul-pub/types';
import { FieldProps } from 'types';
import { Routes } from '@mapbul-pub/ui';

export const UserList = (props: any) => {
   return (
      <List title="All Users" {...props}>
         <SortedGrid {...props}>
            <TextField source={P<IUserDTO>((p) => p.id)} />
            <TextField source={P<IUserDTO>((p) => p.email)} />
            <ReferenceField
               label="UserType"
               source={P<IUserDTO>((p) => p.userTypeId)}
               reference={Routes.usertypes}
            >
               <TextField source={P<IUserTypeDTO>((p) => p.description)} />
            </ReferenceField>
         </SortedGrid>
      </List>
   );
};

const CommonForm: React.FC<FieldProps<IUserDTO>> = (props) => {
   return (
      <SimpleForm {...props} redirect="list">
         <RowLayout>
            <TextInput disabled source={P<IUserDTO>((p) => p.id)} fullWidth />
            <TextInput source={P<IUserDTO>((p) => p.email)} fullWidth validate={required()} />
         </RowLayout>
         <RowLayout>
            <ReferenceInput
               source={P<IUserDTO>((p) => p.userTypeId)}
               reference={Routes.usertypes}
               perPage={1000}
               validate={required()}
               fullWidth
            >
               <SelectInput optionText={P<IUserTypeDTO>((p) => p.description)} />
            </ReferenceInput>
            <DateTimeInput
               source={P<IUserDTO>((p) => p.registrationDate)}
               defaultValue={new Date()}
               fullWidth
            />
         </RowLayout>
      </SimpleForm>
   );
};

export const UserCreate = withCreatePage(CommonForm);

export const UserEdit = withEditPage<IUserDTO>(CommonForm);
