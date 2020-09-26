import * as React from 'react';
import { ImageInput, ImageField } from 'react-admin';

export const ImageFile: React.FC<{ label: string; source: string; [key: string]: any }> = ({
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
