import { CreateParams } from 'ra-core';
import { uploadFile, httpClientToken, deleteFile } from 'utils';
import { Routes } from '@mapbul-pub/ui';
import { P } from '@mapbul-pub/utils';
import { ICategoryDTOEx, IMarkerDTOEx } from 'src/interfaces';

export const createUpdateData = async (
   apiUrl: string,
   resource: string,
   params: CreateParams,
   erase = false
) => {
   let data = params.data;

   if (resource === Routes.categories) {
      data = await uploadFile(
         apiUrl,
         data,
         P<ICategoryDTOEx>((p) => p.iconFile),
         P<ICategoryDTOEx>((p) => p.icon),
         erase
      );
      data = await uploadFile(
         apiUrl,
         data,
         P<ICategoryDTOEx>((p) => p.pinFile),
         P<ICategoryDTOEx>((p) => p.pin),
         erase
      );
   } else if (resource === Routes.markers) {
      data = await uploadFile(
         apiUrl,
         data,
         P<IMarkerDTOEx>((p) => p.logoFile),
         P<IMarkerDTOEx>((p) => p.logo),
         erase
      );
      data = await uploadFile(
         apiUrl,
         data,
         P<IMarkerDTOEx>((p) => p.photoFile),
         P<IMarkerDTOEx>((p) => p.photo),
         erase
      );
   }

   return data;
};

export const deleteRecord = async (apiUrl: string, resource: string, id: string | number) => {
   const response = await httpClientToken(`${apiUrl}/${resource}/${id}`, {
      method: 'DELETE'
   });
   if (resource === Routes.categories) {
      // const data = params.previousData as ICategoryDTOEx;
      const data = response.json as ICategoryDTOEx;
      await deleteFile(apiUrl, data.icon);
      await deleteFile(apiUrl, data.pin);
   } else if (resource === Routes.markers) {
      const data = response.json as IMarkerDTOEx;
      if (data.logo) await deleteFile(apiUrl, data.logo);
      if (data.photo) await deleteFile(apiUrl, data.photo);
   }
   return response;
};
