import * as React from 'react';
import { useMediaQuery, Theme, Box } from '@material-ui/core';
import {
   List,
   TextField,
   Show,
   SimpleShowLayout,
   DateField,
   SimpleForm,
   TextInput,
   DateInput,
   ReferenceInput,
   ImageInput,
   BooleanInput,
   AutocompleteInput,
   BooleanField,
   required,
   ImageField
} from 'react-admin';
import { P, clearUrl } from '@mapbul-pub/utils';
import { Routes } from '@mapbul-pub/ui';
import { SortedGrid } from 'components';
import { RowLayout, SectionTitle, Poster } from 'ui';
import { GlobalVar } from 'src/constants';
import { withCreatePage, withEditPage } from 'hocs';
import { ICategoryDTOEx } from 'interfaces';

// <SimpleList
//   primaryText={(record: ICategoryDTOEx) => record.name}
//   secondaryText={(record: ICategoryDTOEx) => record.id}
//   tertiaryText={(record: ICategoryDTOEx) => record.parentId}
// /></List>

export const CategoryList: React.FC = (props: any) => {
   const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
   return (
      <List title="All categories" {...props}>
         <SortedGrid {...props}>
            <TextField source={P<ICategoryDTOEx>((p) => p.id)} />
            <TextField source={P<ICategoryDTOEx>((p) => p.name)} />
            <TextField source={P<ICategoryDTOEx>((p) => p.enName)} />
            {!isSmall && <BooleanField source={P<ICategoryDTOEx>((p) => p.forArticle)} />}
         </SortedGrid>
      </List>
   );
};

export const CategoryShow: React.FC = (props: any) => (
   <Show {...props}>
      <SimpleShowLayout>
         <TextField source={P<ICategoryDTOEx>((p) => p.id)} />
         <TextField source={P<ICategoryDTOEx>((p) => p.parentId)} />
         <TextField source={P<ICategoryDTOEx>((p) => p.name)} />
         <TextField source={P<ICategoryDTOEx>((p) => p.enName)} />
         <DateField label="Added date" source={P<ICategoryDTOEx>((p) => p.addedDate)} />
      </SimpleShowLayout>
   </Show>
);

const ImageFile: React.FC<{ label: string; source: string; [key: string]: any }> = ({
   label,
   source,
   ...props
}) => {
   return (
      <ImageInput
         source={source}
         label={label}
         accept="image/*"
         placeholder={<p>Drop your file here</p>}
         {...props}
      >
         <ImageField source={source} title="title" />
      </ImageInput>
   );
};

export const CategoryCreate: React.FC = withCreatePage((props) => {
   return (
      <SimpleForm {...props} redirect="list">
         <SectionTitle label="Main" />
         <RowLayout>
            <TextInput disabled source={P<ICategoryDTOEx>((p) => p.id)} fullWidth />
            <ReferenceInput
               source={P<ICategoryDTOEx>((p) => p.parentId)}
               reference={Routes.categories}
               perPage={1000}
               fullWidth
            >
               <AutocompleteInput optionText={P<ICategoryDTOEx>((p) => p.name)} defaultValue="1" />
            </ReferenceInput>
         </RowLayout>
         <RowLayout>
            <TextInput source={P<ICategoryDTOEx>((p) => p.name)} fullWidth validate={required()} />
            <TextInput source={P<ICategoryDTOEx>((p) => p.enName)} fullWidth defaultValue="" />
         </RowLayout>
         <BooleanInput
            source={P<ICategoryDTOEx>((p) => p.forArticle)}
            fullWidth
            defaultValue={false}
         />
         <SectionTitle label="Misc" />
         <RowLayout>
            <ImageFile
               label="icon"
               source={P<ICategoryDTOEx>((p) => p.iconFile)}
               validate={required()}
            />
            <ImageFile
               label="pin"
               source={P<ICategoryDTOEx>((p) => p.pinFile)}
               validate={required()}
            />
         </RowLayout>
         <RowLayout>
            <DateInput
               source={P<ICategoryDTOEx>((p) => p.addedDate)}
               fullWidth
               defaultValue={new Date()}
            />
            <TextInput source={P<ICategoryDTOEx>((p) => p.color)} fullWidth validate={required()} />
         </RowLayout>
      </SimpleForm>
   );
});

export const CategoryEdit = withEditPage<ICategoryDTOEx>((props) => {
   const { record } = props;
   return (
      <SimpleForm {...props}>
         <SectionTitle label="Main" />
         <RowLayout>
            <TextInput disabled source={P<ICategoryDTOEx>((p) => p.id)} fullWidth />
            <ReferenceInput
               source={P<ICategoryDTOEx>((p) => p.parentId)}
               reference={Routes.categories}
               perPage={1000}
               fullWidth
            >
               {/* <SelectInput optionText={P<ICategoryDTOEx>(p => p.name)} /> */}
               <AutocompleteInput optionText={P<ICategoryDTOEx>((p) => p.name)} />
            </ReferenceInput>
         </RowLayout>
         <RowLayout>
            <TextInput source={P<ICategoryDTOEx>((p) => p.name)} fullWidth />
            <TextInput source={P<ICategoryDTOEx>((p) => p.enName)} fullWidth />
         </RowLayout>
         <BooleanInput source={P<ICategoryDTOEx>((p) => p.forArticle)} fullWidth />
         <SectionTitle label="Misc" />
         <RowLayout style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Box>
               <Poster src={clearUrl(`${GlobalVar.env.imageUrl}/${record?.icon}`)} />
               <TextInput source={P<ICategoryDTOEx>((p) => p.icon)} multiline fullWidth />
               <ImageFile label="icon" source={P<ICategoryDTOEx>((p) => p.iconFile)} />
            </Box>
            <Box>
               <Poster src={clearUrl(`${GlobalVar.env.imageUrl}/${record?.pin}`)} />
               <TextInput source={P<ICategoryDTOEx>((p) => p.pin)} multiline fullWidth />
               <ImageFile label="pin" source={P<ICategoryDTOEx>((p) => p.pinFile)} />
            </Box>
         </RowLayout>
         <RowLayout>
            <DateInput source={P<ICategoryDTOEx>((p) => p.addedDate)} fullWidth />
            <TextInput source={P<ICategoryDTOEx>((p) => p.color)} fullWidth />
         </RowLayout>
      </SimpleForm>
   );
});
