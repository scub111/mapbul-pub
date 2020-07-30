import * as React from 'react';
import { useMediaQuery, Theme } from '@material-ui/core';
import {
  SimpleList, List, Datagrid, EmailField, TextField, EditButton, ShowButton,
  Show, SimpleShowLayout, RichTextField, DateField,
  Edit, SimpleForm, TextInput, ReferenceInput, SelectInput
} from 'react-admin';
import { P } from '@mapbul-pub/utils';
import { ICategoryDTO } from '@mapbul-pub/types';

export const CategoryList: React.FC = (props: any) => {
  const isSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  return (
    <List title="All categories" {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={(record: ICategoryDTO) => record.name}
          secondaryText={(record: ICategoryDTO) => record.id}
          tertiaryText={(record: ICategoryDTO) => record.parentId}
        />
      ) : (
          <Datagrid>
            <TextField source={P<ICategoryDTO>((p) => p.id)} />
            <TextField source={P<ICategoryDTO>((p) => p.name)} />
            <EditButton />
            <ShowButton />
          </Datagrid>
        )}
    </List>
  );
};

export const CategoryShow: React.FC = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source={P<ICategoryDTO>((p) => p.id)} />
      <TextField source={P<ICategoryDTO>((p) => p.parentId)} />
      <TextField source={P<ICategoryDTO>((p) => p.name)} />
      <TextField source={P<ICategoryDTO>((p) => p.enName)} />
      {/* <RichTextField source="body" /> */}
      <DateField label="Added date" source={P<ICategoryDTO>((p) => p.addedDate)} />
    </SimpleShowLayout>
  </Show>
);

export const CategoryeEdit: React.FC = (props: any) => (
  <Edit title={""} {...props}>
     <SimpleForm>
        <TextInput disabled source={P<ICategoryDTO>((p) => p.id)} />
        {/* <ReferenceInput label="User" source="userId" reference="users">
           <SelectInput optionText="name" />
        </ReferenceInput> */}
        <TextInput source={P<ICategoryDTO>((p) => p.name)} />
        {/* <TextInput multiline source="body" /> */}
     </SimpleForm>
  </Edit>
);

