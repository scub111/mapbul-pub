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
import { ICityDTO, IMarkerDTO, ICountryDTO } from '@mapbul-pub/types';
import { Routes } from '@mapbul-pub/ui';

export const CityList: React.FC = (props: any) => {
   return (
      <List title="All cities" {...props}>
         <SortedGrid {...props}>
            <TextField source={P<ICityDTO>((p) => p.id)} />
            <TextField source={P<ICityDTO>((p) => p.name)} />
            <ReferenceField
               label="Country"
               source={P<ICityDTO>((p) => p.countryId)}
               reference={Routes.countries}
            >
               <TextField source={P<ICountryDTO>((p) => p.name)} />
            </ReferenceField>
         </SortedGrid>
      </List>
   );
};

const CommonForm: React.FC = () => (
   <>
      <RowLayout>
         <TextInput disabled source={P<ICityDTO>((p) => p.id)} fullWidth />
         <TextInput source={P<ICityDTO>((p) => p.name)} fullWidth />
      </RowLayout>
      <RowLayout>
         <ReferenceInput
            source={P<ICityDTO>((p) => p.countryId)}
            reference={Routes.countries}
            perPage={1000}
            fullWidth
         >
            <AutocompleteInput optionText={P<ICountryDTO>((p) => p.name)} />
         </ReferenceInput>
         <ReferenceInput
            source={P<ICityDTO>((p) => p.placeId)}
            reference={Routes.markers}
            perPage={1000}
            fullWidth
         >
            <AutocompleteInput optionText={P<IMarkerDTO>((p) => p.name)} />
         </ReferenceInput>
      </RowLayout>
   </>
);

export const CityCreate: React.FC = withCreatePage((props) => {
   return (
      <SimpleForm {...props} redirect="list">
         <CommonForm />
      </SimpleForm>
   );
});

export const CityEdit = withEditPage<ICityDTO>((props) => {
   return <SimpleForm {...props}>
      <CommonForm />
   </SimpleForm>;
});
