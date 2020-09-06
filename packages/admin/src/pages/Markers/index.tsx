import * as React from 'react';
import { List, TextField, SimpleForm, TextInput, required } from 'react-admin';
import { P } from '@mapbul-pub/utils';
import { SortedGrid } from 'components';
import { RowLayout } from 'ui';
import { withCreatePage, withEditPage } from 'hocs';
import { IMarkerDTOEx } from 'interfaces';

export const MarkerList: React.FC = (props: any) => {
   return (
      <List title="All markers" {...props}>
         <SortedGrid {...props}>
            <TextField source={P<IMarkerDTOEx>((p) => p.id)} />
            <TextField source={P<IMarkerDTOEx>((p) => p.nameEn)} />
            <TextField source={P<IMarkerDTOEx>((p) => p.street)} />
            <TextField source={P<IMarkerDTOEx>((p) => p.description)} />
         </SortedGrid>
      </List>
   );
};

export const MarkerCreate: React.FC = withCreatePage((props) => {
   return (
      <SimpleForm {...props} redirect="list">
         <RowLayout>
            <TextInput disabled source={P<IMarkerDTOEx>((p) => p.id)} fullWidth />
            <TextInput source={P<IMarkerDTOEx>((p) => p.name)} fullWidth validate={required()} />
         </RowLayout>
         <TextInput source={P<IMarkerDTOEx>((p) => p.description)} fullWidth defaultValue="" />
      </SimpleForm>
   );
});

export const MarkerEdit = withEditPage<IMarkerDTOEx>((props) => {
   return (
      <SimpleForm {...props}>
         <RowLayout>
            <TextInput disabled source={P<IMarkerDTOEx>((p) => p.id)} fullWidth />
            <TextInput source={P<IMarkerDTOEx>((p) => p.name)} fullWidth />
         </RowLayout>
         <TextInput source={P<IMarkerDTOEx>((p) => p.description)} fullWidth />
      </SimpleForm>
   );
});
