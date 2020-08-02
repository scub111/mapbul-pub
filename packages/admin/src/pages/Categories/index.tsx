import * as React from 'react';
import { useMediaQuery, Theme, Box, CardContent, Card } from '@material-ui/core';
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
   SelectInput,
   BooleanInput,
   AutocompleteInput
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
            <Datagrid rowClick="edit">
               <TextField source={P<ICategoryDTO>((p) => p.id)} />
               <TextField source={P<ICategoryDTO>((p) => p.name)} />
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
         <TextField source={P<ICategoryDTO>((p) => p.id)} />
         <TextField source={P<ICategoryDTO>((p) => p.parentId)} />
         <TextField source={P<ICategoryDTO>((p) => p.name)} />
         <TextField source={P<ICategoryDTO>((p) => p.enName)} />
         <DateField label="Added date" source={P<ICategoryDTO>((p) => p.addedDate)} />
      </SimpleShowLayout>
   </Show>
);

const RowLayout: React.FC = ({ children }) => (
   <Box display={{ xs: 'block', sm: 'flex' }} style={{ width: '100%' }}>
      {React.Children.toArray(children).map((child, i, array) => {
         return (
            <Box flex={1} mr={{ xs: 0, sm: i !== array.length - 1 ? '0.5em' : 0 }}>
               {child}
            </Box>
         );
      })}
   </Box>
);

export const CategoryeEdit: React.FC = (props: any) => (
   <Edit title={''} {...props}>
      <SimpleForm>
         <RowLayout>
            <TextInput disabled source={P<ICategoryDTO>((p) => p.id)} fullWidth />
            <ReferenceInput
               source={P<ICategoryDTO>((p) => p.parentId)}
               reference={Routes.categories}
               perPage={1000}
               fullWidth
            >
               {/* <SelectInput optionText={P<ICategoryDTO>((p) => p.name)} /> */}
               <AutocompleteInput optionText={P<ICategoryDTO>((p) => p.name)} />
            </ReferenceInput>
         </RowLayout>
         <RowLayout>
            <TextInput source={P<ICategoryDTO>((p) => p.name)} fullWidth flex={1} />
            <TextInput source={P<ICategoryDTO>((p) => p.enName)} fullWidth />
         </RowLayout>
         <RowLayout>
            <TextInput source={P<ICategoryDTO>((p) => p.icon)} multiline fullWidth />
            <TextInput source={P<ICategoryDTO>((p) => p.pin)} multiline fullWidth />
         </RowLayout>
         <RowLayout>
            <DateInput source={P<ICategoryDTO>((p) => p.addedDate)} fullWidth />
            <TextInput source={P<ICategoryDTO>((p) => p.color)} fullWidth />
         </RowLayout>
         <BooleanInput source={P<ICategoryDTO>((p) => p.forArticle)} fullWidth />
      </SimpleForm>
   </Edit>
);
