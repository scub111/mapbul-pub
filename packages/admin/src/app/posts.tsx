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

const PostFilter = (props: any) => (
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

export const PostList = (props: any) => (
   <List {...props} filters={<PostFilter />}>
      <Datagrid>
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

const PostTitle = ({ record }: any) => {
   return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostEdit = (props: any) => (
   <Edit title={<PostTitle />} {...props}>
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

export const PostCreate = (props: any) => (
   <Create {...props}>
      <SimpleForm>
         <ReferenceInput label="User" source="userId" reference="users">
            <SelectInput optionText="name" />
         </ReferenceInput>
         <TextInput source="title" />
         <TextInput multiline source="body" />
      </SimpleForm>
   </Create>
);

export const PostShow = (props: any) => (
   <Show {...props}>
      <SimpleShowLayout>
         <TextField source="title" />
         <TextField source="teaser" />
         <RichTextField source="body" />
         <DateField label="Publication date" source="created_at" />
      </SimpleShowLayout>
   </Show>
);
