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
import { FieldProps } from 'types';

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

const CommonForm: React.FC<FieldProps<ICityDTO>> = (props) => (
  <SimpleForm {...props} redirect="list">
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
  </SimpleForm>
);

export const CityCreate: React.FC = withCreatePage(CommonForm);

export const CityEdit = withEditPage<ICityDTO>(CommonForm);
