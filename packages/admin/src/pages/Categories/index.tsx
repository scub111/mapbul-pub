import * as React from 'react';
import { useMediaQuery, Theme } from '@material-ui/core';
import {
   SimpleList,
   List,
   Datagrid,
   EmailField,
   TextField,
   EditButton,
   ShowButton,
   Show,
   SimpleShowLayout,
   RichTextField,
   DateField,
   Edit,
   SimpleForm,
   TextInput,
   DateInput,
   ReferenceInput,
   SelectInput
} from 'react-admin';
import { P } from '@mapbul-pub/utils';
import { ICategoryDTO } from '@mapbul-pub/types';
import { Routes } from '@mapbul-pub/ui';

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
         <DateField label="Added date" source={P<ICategoryDTO>((p) => p.addedDate)} />
      </SimpleShowLayout>
   </Show>
);

export const CategoryeEdit: React.FC = (props: any) => (
   <Edit title={''} {...props}>
      <SimpleForm>
         <TextInput disabled source={P<ICategoryDTO>((p) => p.id)} />
         <ReferenceInput source={P<ICategoryDTO>((p) => p.parentId)} reference={Routes.categories}>
            <SelectInput optionText={P<ICategoryDTO>((p) => p.name)} />
         </ReferenceInput>
         <TextInput source={P<ICategoryDTO>((p) => p.name)} />
         <TextInput source={P<ICategoryDTO>((p) => p.enName)} />
         <DateInput source={P<ICategoryDTO>((p) => p.addedDate)} />
         <TextInput source={P<ICategoryDTO>((p) => p.icon)} multiline />
         <TextInput source={P<ICategoryDTO>((p) => p.pin)} multiline />
         <TextInput source={P<ICategoryDTO>((p) => p.color)} />
         {/* <TextInput multiline source="body" /> */}
      </SimpleForm>
   </Edit>
);
