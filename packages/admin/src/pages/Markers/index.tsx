import * as React from 'react';
import {
   List,
   TextField,
   SimpleForm,
   TextInput,
   ReferenceInput,
   SelectInput,
   AutocompleteInput,
   NumberInput,
   BooleanInput,
   DateTimeInput,
   required
} from 'react-admin';
import { P } from '@mapbul-pub/utils';
import { SortedGrid, PosterInput } from 'components';
import { RowLayout, SectionTitle } from 'ui';
import { withCreatePage, withEditPage } from 'hocs';
import { IMarkerDTOEx, ICategoryDTOEx } from 'interfaces';
import { FieldProps } from 'types';
import { Routes } from '@mapbul-pub/ui';
import { ICityDTO, IDiscountDTO, IStatusDTO } from '@mapbul-pub/types';
import { Box } from '@material-ui/core';

export const MarkerList = (props: any) => {
   return (
      <List title="All markers" {...props}>
         <SortedGrid {...props}>
            <TextField source={P<IMarkerDTOEx>((p) => p.id)} />
            <TextField source={P<IMarkerDTOEx>((p) => p.nameEn)} />
            <TextField source={P<IMarkerDTOEx>((p) => p.street)} />
            <TextField source={P<IMarkerDTOEx>((p) => p.description)} />
         </SortedGrid>
      </List>
   );
};

const CommonForm = (props: FieldProps<IMarkerDTOEx>) => {
   // const dataProvider = useDataProvider();
   // const [user, setUser] = useState();
   // const [loading, setLoading] = useState(true);

   // const [error, setError] = useState();
   // useEffect(() => {
   //     dataProvider.getOne('users', { id: userId })
   //         .then(({ data }) => {
   //             setUser(data);
   //             setLoading(false);
   //         })
   //         .catch(error => {
   //             setError(error);
   //             setLoading(false);
   //         })
   // }, []);
   const { isEdit, record } = props;
   return (
      <SimpleForm {...props} redirect="list">
         <SectionTitle label="Main" />
         <RowLayout>
            <TextInput source={P<IMarkerDTOEx>((p) => p.id)} disabled fullWidth />
         </RowLayout>
         <RowLayout>
            <TextInput source={P<IMarkerDTOEx>((p) => p.name)} validate={required()} fullWidth />
            <TextInput source={P<IMarkerDTOEx>((p) => p.nameEn)} defaultValue="" fullWidth />
         </RowLayout>
         <RowLayout>
            <TextInput
               source={P<IMarkerDTOEx>((p) => p.introduction)}
               validate={required()}
               multiline
               defaultValue=""
               fullWidth
            />
            <TextInput
               source={P<IMarkerDTOEx>((p) => p.introductionEn)}
               multiline
               defaultValue=""
               fullWidth
            />
         </RowLayout>
         <RowLayout>
            <TextInput
               source={P<IMarkerDTOEx>((p) => p.description)}
               validate={required()}
               multiline
               defaultValue=""
               fullWidth
            />
            <TextInput
               source={P<IMarkerDTOEx>((p) => p.descriptionEn)}
               multiline
               defaultValue=""
               fullWidth
            />
         </RowLayout>
         <SectionTitle label="Location" />
         <RowLayout>
            <ReferenceInput
               source={P<IMarkerDTOEx>((p) => p.cityId)}
               reference={Routes.cities}
               validate={required()}
               perPage={1000}
               defaultValue=""
               fullWidth
            >
               <AutocompleteInput optionText={P<ICityDTO>((p) => p.name)} defaultValue="1" />
            </ReferenceInput>
         </RowLayout>
         <RowLayout>
            <TextInput
               source={P<IMarkerDTOEx>((p) => p.street)}
               validate={required()}
               multiline
               defaultValue=""
               fullWidth
            />
            <TextInput
               source={P<IMarkerDTOEx>((p) => p.house)}
               validate={required()}
               multiline
               defaultValue=""
               fullWidth
            />
         </RowLayout>
         <RowLayout>
            <TextInput
               source={P<IMarkerDTOEx>((p) => p.buliding)}
               label="Building"
               multiline
               defaultValue=""
               fullWidth
            />
            <TextInput source={P<IMarkerDTOEx>((p) => p.floor)} multiline fullWidth />
         </RowLayout>
         <RowLayout>
            <NumberInput
               source={P<IMarkerDTOEx>((p) => p.lat)}
               validate={required()}
               defaultValue="-1"
               fullWidth
            />
            <NumberInput
               source={P<IMarkerDTOEx>((p) => p.lng)}
               validate={required()}
               defaultValue="-1"
               fullWidth
            />
         </RowLayout>
         <SectionTitle label="Info" />
         <RowLayout>
            <TextInput source={P<IMarkerDTOEx>((p) => p.site)} defaultValue="" fullWidth />
            <TextInput source={P<IMarkerDTOEx>((p) => p.email)} defaultValue="" fullWidth />
         </RowLayout>
         <RowLayout>
            <TextInput source={P<IMarkerDTOEx>((p) => p.entryTicket)} fullWidth />
         </RowLayout>
         <SectionTitle label="Misc" />
         <RowLayout>
            <ReferenceInput
               source={P<IMarkerDTOEx>((p) => p.discountId)}
               reference={Routes.discounts}
               perPage={1000}
               label="Discount"
               fullWidth
            >
               <SelectInput optionText={P<IDiscountDTO>((p) => p.value)} defaultValue="0" />
            </ReferenceInput>
            <BooleanInput source={P<IMarkerDTOEx>((p) => p.wifi)} defaultValue={false} fullWidth />
         </RowLayout>
         <RowLayout>
            <ReferenceInput
               source={P<IMarkerDTOEx>((p) => p.baseCategoryId)}
               reference={Routes.categories}
               perPage={1000}
               label="Category"
               fullWidth
            >
               <AutocompleteInput optionText={P<ICategoryDTOEx>((p) => p.name)} defaultValue="-1" />
            </ReferenceInput>
            <ReferenceInput
               source={P<IMarkerDTOEx>((p) => p.statusId)}
               reference={Routes.statuses}
               perPage={1000}
               validate={required()}
               fullWidth
            >
               <SelectInput optionText={P<IStatusDTO>((p) => p.description)} />
            </ReferenceInput>
         </RowLayout>
         <RowLayout>
            <DateTimeInput
               source={P<IMarkerDTOEx>((p) => p.addedDate)}
               defaultValue={new Date()}
               fullWidth
            />
            <BooleanInput
               source={P<IMarkerDTOEx>((p) => p.personal)}
               defaultValue={false}
               fullWidth
            />
         </RowLayout>
         <RowLayout>
            <DateTimeInput
               source={P<IMarkerDTOEx>((p) => p.publishedDate)}
               defaultValue={new Date()}
               fullWidth
            />
            <DateTimeInput
               source={P<IMarkerDTOEx>((p) => p.checkDate)}
               // defaultValue={new Date()}
               fullWidth
            />
         </RowLayout>
         <RowLayout style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Box style={{ minWidth: '100%' }}>
               <PosterInput
                  imageFile={P<IMarkerDTOEx>((p) => p.logoFile)}
                  image={P<IMarkerDTOEx>((p) => p.logo)}
                  label="logo"
                  isEdit={isEdit}
                  imageSource={record?.logo}
                  validate={required()}
               />
            </Box>
            <Box style={{ minWidth: '100%' }}>
               <PosterInput
                  imageFile={P<IMarkerDTOEx>((p) => p.photoFile)}
                  image={P<IMarkerDTOEx>((p) => p.photo)}
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

export const MarkerCreate = withCreatePage(CommonForm);

export const MarkerEdit = withEditPage<IMarkerDTOEx>(CommonForm);
