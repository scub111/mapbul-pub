import * as React from 'react';
import { P } from '@mapbul-pub/utils';
import { Routes } from '@mapbul-pub/ui';
import { IArticleDTO, ICategoryDTO, IStatusDTO, ICityDTO } from '@mapbul-pub/types';
import {
   List,
   ReferenceField,
   TextField,
   ReferenceInput,
   SimpleForm,
   TextInput,
   Filter,
   DateTimeInput,
   AutocompleteInput,
   SelectInput,
   required
} from 'react-admin';
import { IArticleDTOEx, ICategoryDTOEx, IMarkerDTOEx } from 'interfaces';
import { RowLayout, SectionTitle } from 'ui';
import { withEditPage, withCreatePage } from 'hocs';
import { SortedGrid, PosterInput } from 'components';
import { FieldProps } from 'types';
import { Box } from '@material-ui/core';

const ArticleFilter = (props: any) => (
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

const PostPanel = ({ record }: { id?: string; record?: IArticleDTO; resource?: string }) => (
   <div dangerouslySetInnerHTML={{ __html: record?.text || '' }} />
);

export const ArticleList = (props: any) => (
   <List {...props} filters={<ArticleFilter />}>
      <SortedGrid expand={<PostPanel />}>
         <TextField source={P<IArticleDTO>((p) => p.id)} />
         <ReferenceField
            label="Category"
            source={P<IArticleDTO>((p) => p.baseCategoryId)}
            reference={Routes.categories}
         >
            <TextField source={P<ICategoryDTO>((p) => p.name)} />
         </ReferenceField>
         <TextField source={P<IArticleDTO>((p) => p.title)} label="Title" />
         <TextField source={P<IArticleDTO>((p) => p.description)} label="Description" />
         <ReferenceField
            label="Status"
            source={P<IArticleDTO>((p) => p.statusId)}
            reference={Routes.statuses}
         >
            <TextField source={P<IStatusDTO>((p) => p.description)} />
         </ReferenceField>
      </SortedGrid>
   </List>
);

const CommonForm = (props: FieldProps<IArticleDTOEx>) => {
   const { isEdit, record } = props;
   return (
      <SimpleForm {...props} redirect="list">
         <SectionTitle label="Main" />
         {/* <TextInput disabled source={P<IArticleDTOEx>((p) => p.id)} /> */}
         {/* <ReferenceInput label="User" source="userId" reference="users">
       <SelectInput optionText="name" />
    </ReferenceInput> */}
         <RowLayout>
            <TextInput source={P<IArticleDTOEx>((p) => p.title)} validate={required()} fullWidth />
            <TextInput source={P<IArticleDTOEx>((p) => p.titleEn)} fullWidth />
         </RowLayout>
         <RowLayout>
            <TextInput
               source={P<IArticleDTOEx>((p) => p.description)}
               validate={required()}
               fullWidth
            />
            <TextInput source={P<IArticleDTOEx>((p) => p.descriptionEn)} fullWidth />
         </RowLayout>
         <RowLayout>
            <TextInput
               source={P<IArticleDTOEx>((p) => p.text)}
               multiline
               validate={required()}
               fullWidth
            />
            <TextInput source={P<IArticleDTOEx>((p) => p.textEn)} multiline fullWidth />
         </RowLayout>
         <RowLayout>
            <TextInput source={P<IArticleDTOEx>((p) => p.sourceUrl)} fullWidth />
            <TextInput source={P<IArticleDTOEx>((p) => p.sourceUrlEn)} fullWidth />
         </RowLayout>
         <SectionTitle label="Misc" />
         <RowLayout>
            <ReferenceInput
               source={P<IArticleDTOEx>((p) => p.baseCategoryId)}
               reference={Routes.categories}
               perPage={1000}
               validate={required()}
               label="Category"
               fullWidth
            >
               <AutocompleteInput optionText={P<ICategoryDTOEx>((p) => p.name)} />
            </ReferenceInput>
            <ReferenceInput
               source={P<IArticleDTOEx>((p) => p.statusId)}
               reference={Routes.statuses}
               perPage={1000}
               validate={required()}
               // label="Status *"
               fullWidth
            >
               <SelectInput optionText={P<IStatusDTO>((p) => p.description)} />
            </ReferenceInput>
         </RowLayout>
         <RowLayout>
            <DateTimeInput
               source={P<IArticleDTOEx>((p) => p.startDate)}
               defaultValue={new Date()}
               fullWidth
            />
            <DateTimeInput
               source={P<IArticleDTOEx>((p) => p.endDate)}
               defaultValue={new Date()}
               fullWidth
            />
         </RowLayout>
         <RowLayout>
            {/* <DateTimeInput
               source={P<IArticleDTOEx>((p) => p.addedDate)}
               defaultValue={new Date()}
               validate={required()}
               fullWidth
            /> */}
            <DateTimeInput
               source={P<IArticleDTOEx>((p) => p.publishedDate)}
               defaultValue={new Date()}
               fullWidth
            />
         </RowLayout>
         <RowLayout>
            <ReferenceInput
               source={P<IArticleDTOEx>((p) => p.markerId)}
               reference={Routes.markers}
               perPage={1000}
               fullWidth
            >
               <AutocompleteInput optionText={P<IMarkerDTOEx>((p) => p.name)} />
            </ReferenceInput>
            <ReferenceInput
               source={P<IArticleDTOEx>((p) => p.cityId)}
               reference={Routes.cities}
               perPage={1000}
               fullWidth
            >
               <AutocompleteInput optionText={P<ICityDTO>((p) => p.name)} />
            </ReferenceInput>
         </RowLayout>
         <RowLayout style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Box style={{ minWidth: '100%' }}>
               <PosterInput
                  imageFile={P<IArticleDTOEx>((p) => p.titlePhotoFile)}
                  image={P<IArticleDTOEx>((p) => p.titlePhoto)}
                  label="titlePhoto"
                  isEdit={isEdit}
                  imageSource={record?.titlePhoto}
                  validate={required()}
               />
            </Box>
            <Box style={{ minWidth: '100%' }}>
               <PosterInput
                  imageFile={P<IArticleDTOEx>((p) => p.photoFile)}
                  image={P<IArticleDTOEx>((p) => p.photo)}
                  label="photo"
                  isEdit={isEdit}
                  imageSource={record?.photo}
                  validate={required()}
               />
            </Box>
         </RowLayout>
      </SimpleForm>
   );
};

export const ArticleCreate = withCreatePage(CommonForm);

export const ArticleEdit = withEditPage<IArticleDTOEx>(CommonForm);
