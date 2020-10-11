import * as React from 'react';
import {
   List,
   TextField,
   SimpleForm,
   TextInput,
   NumberInput,
   required
} from 'react-admin';
import { P } from '@mapbul-pub/utils';
import { SortedGrid } from 'components';
import { RowLayout } from 'ui';
import { withCreatePage, withEditPage } from 'hocs';
import { IDiscountDTO } from '@mapbul-pub/types';
import { FieldProps } from 'types';

export const DiscountList = (props: any) => {
   return (
      <List title="All countries" {...props}>
         <SortedGrid {...props}>
            <TextField source={P<IDiscountDTO>((p) => p.id)} />
            <TextField source={P<IDiscountDTO>((p) => p.value)} />
         </SortedGrid>
      </List>
   );
};

const CommonForm: React.FC<FieldProps<IDiscountDTO>> = (props) => {
   return (
      <SimpleForm {...props} redirect="list">
         <RowLayout>
            <TextInput source={P<IDiscountDTO>((p) => p.id)} disabled fullWidth />
            <NumberInput
               source={P<IDiscountDTO>((p) => p.value)}
               min={0}
               max={100}
               validate={required()}
               fullWidth
            />
         </RowLayout>
      </SimpleForm>
   );
};

export const DiscountCreate = withCreatePage(CommonForm);

export const DiscountEdit = withEditPage<IDiscountDTO>(CommonForm);
