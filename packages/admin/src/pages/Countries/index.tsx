import * as React from 'react';
import {
   List,
   TextField,
   SimpleForm,
   TextInput,
   ReferenceField,
   ReferenceInput,
   AutocompleteInput,
   required
} from 'react-admin';
import { P } from '@mapbul-pub/utils';
import { SortedGrid } from 'components';
import { RowLayout } from 'ui';
import { withCreatePage, withEditPage } from 'hocs';
import { ICountryDTO, IMarkerDTO } from '@mapbul-pub/types';
import { Routes } from '@mapbul-pub/ui';

export const CountryList: React.FC = (props: any) => {
   return (
      <List title="All countries" {...props}>
         <SortedGrid {...props}>
            <TextField source={P<ICountryDTO>((p) => p.id)} />
            <TextField source={P<ICountryDTO>((p) => p.name)} />
            <TextField source={P<ICountryDTO>((p) => p.enName)} />
            {/* <ReferenceField
               label="Place"
               source={P<ICountryDTO>((p) => p.placeId)}
               reference={Routes.markers}
            >
               <TextField source={P<IMarkerDTO>((p) => p.name)} />
            </ReferenceField> */}
         </SortedGrid>
      </List>
   );
};

export const CountryCreate: React.FC = withCreatePage((props) => {
   return (
      <SimpleForm {...props} redirect="list">
         <RowLayout>
            <TextInput disabled source={P<ICountryDTO>((p) => p.id)} fullWidth />
         </RowLayout>
         <RowLayout>
            <TextInput source={P<ICountryDTO>((p) => p.name)} fullWidth />
            <TextInput source={P<ICountryDTO>((p) => p.enName)} fullWidth validate={required()} />
         </RowLayout>
         <RowLayout>
            <ReferenceInput
               source={P<ICountryDTO>((p) => p.placeId)}
               reference={Routes.markers}
               perPage={1000}
               fullWidth
            >
               <AutocompleteInput optionText={P<IMarkerDTO>((p) => p.name)} />
            </ReferenceInput>
            <TextInput source={P<ICountryDTO>((p) => p.code)} fullWidth validate={required()} />
         </RowLayout>
      </SimpleForm>
   );
});

export const CountryEdit = withEditPage<ICountryDTO>((props) => {
   return (
      <SimpleForm {...props}>
         <RowLayout>
            <TextInput disabled source={P<ICountryDTO>((p) => p.id)} fullWidth />
         </RowLayout>
         <RowLayout>
            <TextInput source={P<ICountryDTO>((p) => p.name)} fullWidth />
            <TextInput source={P<ICountryDTO>((p) => p.enName)} fullWidth validate={required()} />
         </RowLayout>
         <RowLayout>
            <ReferenceInput
               source={P<ICountryDTO>((p) => p.placeId)}
               reference={Routes.markers}
               perPage={1000}
               fullWidth
            >
               <AutocompleteInput optionText={P<IMarkerDTO>((p) => p.name)} />
            </ReferenceInput>
            <TextInput source={P<ICountryDTO>((p) => p.code)} fullWidth validate={required()} />
         </RowLayout>
      </SimpleForm>
   );
});
