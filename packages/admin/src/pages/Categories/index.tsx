import * as React from 'react';
import { useMediaQuery, Theme, Box, CardContent, Card, Typography } from '@material-ui/core';
import {
  SimpleList, List, Datagrid, EmailField, TextField,
  EditButton, ShowButton, Show, SimpleShowLayout, RichTextField,
  DateField, Edit, Create, SimpleForm, TextInput, DateInput, ReferenceInput, ImageInput,
  SelectInput, BooleanInput, AutocompleteInput, BooleanField, required, ImageField,
} from 'react-admin';
import { P, clearUrl } from '@mapbul-pub/utils';
import { ICategoryDTO } from '@mapbul-pub/types';
import { Routes } from '@mapbul-pub/ui';
import { RowLayout } from 'components';
import Poster from './Poster';
import { GlobalVar } from 'src/constants';
import { withCreatePage, withEditPage } from 'hocs';

export const CategoryList: React.FC = (props: any) => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <List title="All categories" {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={(record: ICategoryDTO) => record.name}
          secondaryText={(record: ICategoryDTO) => record.id}
          tertiaryText={(record: ICategoryDTO) => record.parentId}
        />
      ) : (
          <Datagrid rowClick="edit">
            <TextField source={P<ICategoryDTO>(p => p.id)} />
            <TextField source={P<ICategoryDTO>(p => p.name)} />
            <TextField source={P<ICategoryDTO>(p => p.enName)} />
            <BooleanField source={P<ICategoryDTO>(p => p.forArticle)} />
            {/* <EditButton />
               <ShowButton /> */}
          </Datagrid>
        )}
    </List>
  );
};

export const CategoryShow: React.FC = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source={P<ICategoryDTO>(p => p.id)} />
      <TextField source={P<ICategoryDTO>(p => p.parentId)} />
      <TextField source={P<ICategoryDTO>(p => p.name)} />
      <TextField source={P<ICategoryDTO>(p => p.enName)} />
      <DateField label="Added date" source={P<ICategoryDTO>(p => p.addedDate)} />
    </SimpleShowLayout>
  </Show>
);

const SectionTitle = ({ label }: { label: string }) => {
  return (
    <Typography variant="h6" gutterBottom>
      {label}
    </Typography>
  );
};

const ImageFile: React.FC<{label: string; source: string}> = ({label, source}) => {
  return (
    <ImageInput source={source} label={label} accept="image/*" placeholder={<p>Переместите сюда файл</p>}>
      <ImageField source={source} title="title" />
    </ImageInput>
  );
};

export const CategoryCreate: React.FC = withCreatePage((props) => {
  return (
    <SimpleForm {...props}>
      <SectionTitle label="Main" />
      <RowLayout>
        <TextInput disabled source={P<ICategoryDTO>(p => p.id)} fullWidth />
        <ReferenceInput
          source={P<ICategoryDTO>(p => p.parentId)}
          reference={Routes.categories}
          perPage={1000}
          fullWidth
        >
          <AutocompleteInput optionText={P<ICategoryDTO>(p => p.name)} defaultValue="1" />
        </ReferenceInput>
      </RowLayout>
      <RowLayout>
        <TextInput source={P<ICategoryDTO>(p => p.name)} fullWidth validate={required()} />
        <TextInput source={P<ICategoryDTO>(p => p.enName)} fullWidth defaultValue="" />
      </RowLayout>
      <BooleanInput source={P<ICategoryDTO>(p => p.forArticle)} fullWidth defaultValue={false} />
      <SectionTitle label="Photos"/> 
      <RowLayout>
        {/* <TextInput source={P<ICategoryDTO>(p => p.icon)} multiline fullWidth validate={required()} /> */}
        <ImageFile label="icon" source={P<ICategoryDTO>(p => p.icon)}/>
        {/* <TextInput source={P<ICategoryDTO>(p => p.pin)} multiline fullWidth validate={required()} /> */}
        <ImageFile label="pin" source={P<ICategoryDTO>(p => p.pin)}/>
      </RowLayout>
      <RowLayout>
        <DateInput source={P<ICategoryDTO>(p => p.addedDate)} fullWidth defaultValue={new Date()} />
        <TextInput source={P<ICategoryDTO>(p => p.color)} fullWidth validate={required()} />
      </RowLayout>
    </SimpleForm>
  )
});

export const CategoryeEdit = withEditPage<ICategoryDTO>((props) => {
  const { record } = props;
  return (<SimpleForm {...props}>
    <SectionTitle label="Main" />
    <RowLayout>
      <TextInput disabled source={P<ICategoryDTO>(p => p.id)} fullWidth />
      <ReferenceInput
        source={P<ICategoryDTO>(p => p.parentId)}
        reference={Routes.categories}
        perPage={1000}
        fullWidth
      >
        {/* <SelectInput optionText={P<ICategoryDTO>(p => p.name)} /> */}
        <AutocompleteInput optionText={P<ICategoryDTO>(p => p.name)} />
      </ReferenceInput>
    </RowLayout>
    <RowLayout>
      <TextInput source={P<ICategoryDTO>(p => p.name)} fullWidth />
      <TextInput source={P<ICategoryDTO>(p => p.enName)} fullWidth />
    </RowLayout>
    <BooleanInput source={P<ICategoryDTO>(p => p.forArticle)} fullWidth />
    <SectionTitle label="Photos" />
    <RowLayout style={{display: 'flex', alignItems: 'flex-end'}}>
      <Poster src={clearUrl(`${GlobalVar.env.imageUrl}/${record?.icon}`)} />
      <Poster src={clearUrl(`${GlobalVar.env.imageUrl}/${record?.pin}`)} />
    </RowLayout>
    <RowLayout>
      <TextInput source={P<ICategoryDTO>(p => p.icon)} multiline fullWidth />
      <TextInput source={P<ICategoryDTO>(p => p.pin)} multiline fullWidth />
    </RowLayout>
    <RowLayout>
      <DateInput source={P<ICategoryDTO>(p => p.addedDate)} fullWidth />
      <TextInput source={P<ICategoryDTO>(p => p.color)} fullWidth />
    </RowLayout>
  </SimpleForm>)
});

