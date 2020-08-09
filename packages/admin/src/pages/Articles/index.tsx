import * as React from 'react';
import { P } from '@mapbul-pub/utils';
import { Routes } from '@mapbul-pub/ui';
import { IArticleDTO, ICategoryDTO } from '@mapbul-pub/types';
import {
  Show,
  ShowButton,
  SimpleShowLayout,
  RichTextField,
  DateField,
  List,
  Edit,
  Create,
  Datagrid,
  ReferenceField,
  TextField,
  EditButton,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  Filter
} from 'react-admin';

const ArticleFilter: React.FC = (props: any) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    {/* <ReferenceInput
      label="User"
      source="userId"
      reference="users"
      allowEmpty
    >
      <SelectInput optionText="name" />
    </ReferenceInput> */}
  </Filter>
);

const PostPanel = ({ id, record, resource }: { id?: string, record?: IArticleDTO, resource?: string }) => (
  <div dangerouslySetInnerHTML={{ __html: record?.text || '' }} />
);

export const ArticleList: React.FC = (props: any) => (
  <List {...props} filters={<ArticleFilter />}>
    <Datagrid expand={<PostPanel />} >
      <TextField source={P<IArticleDTO>((p) => p.id)} label="№" />
      <ReferenceField
        label="Категория"
        source={P<IArticleDTO>((p) => p.baseCategoryId)}
        reference={Routes.categories}
      >
        <TextField source={P<ICategoryDTO>((p) => p.name)} />
      </ReferenceField>
      <TextField source={P<IArticleDTO>((p) => p.title)} label="Название" />
      <TextField source={P<IArticleDTO>((p) => p.description)} label="Описание" />

      {/* <TextField source={P<IArticleDTO>(p => p.text)} label="Текст" /> */}
      {/* <TextField source="title" />
            <TextField source="title" />
            <TextField source="title" /> */}
      {/* <EditButton />
            <ShowButton /> */}
    </Datagrid>
  </List>
);

const ArticleTitle: React.FC = ({ record }: any) => {
  return <span>Article {record ? `"${record.title}"` : ''}</span>;
};

export const ArticleEdit: React.FC = (props: any) => (
  <Edit title={<ArticleTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput label="User" source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="title" />
      <TextInput multiline source="body" />
    </SimpleForm>
  </Edit>
);

export const ArticleCreate: React.FC = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source={P<IArticleDTO>((p) => p.title)} />
      <TextInput multiline source={P<IArticleDTO>((p) => p.text)} />
    </SimpleForm>
  </Create>
);

export const ArticleShow: React.FC = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="title" />
      <TextField source="teaser" />
      <RichTextField source="body" />
      <DateField label="Publication date" source="created_at" />
    </SimpleShowLayout>
  </Show>
);
