import * as React from 'react';
import {
   List,
   TextField,
   NumberInput,
   SimpleForm,
   TextInput,
   ReferenceField,
   ReferenceInput,
   SelectInput,
   AutocompleteInput,
   required
} from 'react-admin';
import { P } from '@mapbul-pub/utils';
import { SortedGrid } from 'components';
import { RowLayout } from 'ui';
import { withCreatePage, withEditPage } from 'hocs';
import { ICityDTO, IMarkerDTO, ICountryDTO } from '@mapbul-pub/types';
import { Routes } from '@mapbul-pub/ui';
import { FieldProps } from 'types';

export const CityList = (props: any) => {
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

const CommonForm: React.FC<FieldProps<ICityDTO>> = (props) => (
   <SimpleForm {...props} redirect="list">
      <RowLayout>
         <TextInput source={P<ICityDTO>((p) => p.id)} disabled fullWidth />
         <TextInput source={P<ICityDTO>((p) => p.name)} validate={required()} fullWidth />
      </RowLayout>
      <RowLayout>
         <NumberInput
            source={P<ICityDTO>((p) => p.lat)}
            validate={required()}
            defaultValue="-1"
            fullWidth
         />
         <NumberInput
            source={P<ICityDTO>((p) => p.lng)}
            validate={required()}
            defaultValue="-1"
            fullWidth
         />
      </RowLayout>
      <RowLayout>
         <ReferenceInput
            source={P<ICityDTO>((p) => p.countryId)}
            reference={Routes.countries}
            perPage={1000}
            validate={required()}
            fullWidth
         >
            <SelectInput optionText={P<ICountryDTO>((p) => p.name)} />
         </ReferenceInput>
         <ReferenceInput
            source={P<ICityDTO>((p) => p.placeId)}
            reference={Routes.markers}
            perPage={1000}
            fullWidth
         >
            <AutocompleteInput optionText={P<IMarkerDTO>((p) => p.name)} defaultValue="-1" />
         </ReferenceInput>
      </RowLayout>
   </SimpleForm>
);

export const CityCreate = withCreatePage(CommonForm);

export const CityEdit = withEditPage<ICityDTO>(CommonForm);
