import * as React from 'react';
import { List, TextField, SimpleForm, TextInput, required } from 'react-admin';
import { P } from '@mapbul-pub/utils';
import { SortedGrid } from 'components';
import { RowLayout } from 'ui';
import { withCreatePage, withEditPage } from 'hocs';
import { IStatusDTO } from '@mapbul-pub/types';
import { FieldProps } from 'types';

export const StatusList = (props: any) => {
   return (
      <List title="All statuses" {...props}>
         <SortedGrid {...props}>
            <TextField source={P<IStatusDTO>((p) => p.id)} />
            <TextField source={P<IStatusDTO>((p) => p.tag)} />
            <TextField source={P<IStatusDTO>((p) => p.description)} />
         </SortedGrid>
      </List>
   );
};

const CommonForm = (props: FieldProps<IStatusDTO>) => {
   return (
      <SimpleForm {...props} redirect="list">
         <RowLayout>
            <TextInput disabled source={P<IStatusDTO>((p) => p.id)} fullWidth />
            <TextInput source={P<IStatusDTO>((p) => p.tag)} fullWidth validate={required()} />
         </RowLayout>
         <TextInput source={P<IStatusDTO>((p) => p.description)} fullWidth defaultValue="" />
      </SimpleForm>
   );
};

export const StatusCreate = withCreatePage(CommonForm);

export const StatusEdit = withEditPage<IStatusDTO>(CommonForm);
