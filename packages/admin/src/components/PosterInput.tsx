import * as React from 'react';
import { Poster, ImageFile } from 'src/ui';
import { clearUrl } from '@mapbul-pub/utils';
import { GlobalVar } from 'src/constants';
import { TextInput } from 'react-admin';

export const PosterInput = ({
   imageFile,
   image,
   label,
   isEdit,
   imageSource,
   validate
}: {
   imageFile: string;
   image: string;
   label: string;
   isEdit?: boolean;
   imageSource?: string | null;
   validate?: any;
}) => {
   return (
      <>
         {isEdit ? (
            <>
               <Poster src={clearUrl(`${GlobalVar.env.imageUrl}/${imageSource}`)} />
               <TextInput source={image} multiline validate={validate} fullWidth />
               <ImageFile label={label} source={imageFile} fullWidth />
            </>
         ) : (
            <ImageFile label={label} source={imageFile} validate={validate} fullWidth />
         )}
      </>
   );
};
