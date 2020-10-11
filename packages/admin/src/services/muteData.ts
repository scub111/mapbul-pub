import { CreateParams } from 'ra-core';
import { uploadFile, httpClientToken, deleteFile } from 'utils';
import { Routes, ImageDirs } from '@mapbul-pub/ui';
import { P } from '@mapbul-pub/utils';
import { ICategoryDTOEx, IMarkerDTOEx, IArticleDTOEx } from 'interfaces';

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
         ImageDirs.CategoryIcons,
         erase
      );
      data = await uploadFile(
         apiUrl,
         data,
         P<ICategoryDTOEx>((p) => p.pinFile),
         P<ICategoryDTOEx>((p) => p.pin),
         ImageDirs.CategoryIcons,
         erase
      );
   } else if (resource === Routes.markers) {
      data = await uploadFile(
         apiUrl,
         data,
         P<IMarkerDTOEx>((p) => p.logoFile),
         P<IMarkerDTOEx>((p) => p.logo),
         ImageDirs.MarkerPhotos,
         erase
      );
      data = await uploadFile(
         apiUrl,
         data,
         P<IMarkerDTOEx>((p) => p.photoFile),
         P<IMarkerDTOEx>((p) => p.photo),
         ImageDirs.MarkerPhotos,
         erase
      );
   } else if (resource === Routes.articles) {
      data = await uploadFile(
         apiUrl,
         data,
         P<IArticleDTOEx>((p) => p.titlePhotoFile),
         P<IArticleDTOEx>((p) => p.titlePhoto),
         ImageDirs.ArticlePhotos,
         erase
      );
      data = await uploadFile(
         apiUrl,
         data,
         P<IArticleDTOEx>((p) => p.photoFile),
         P<IArticleDTOEx>((p) => p.photo),
         ImageDirs.ArticlePhotos,
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
   } else if (resource === Routes.articles) {
      const data = response.json as IArticleDTOEx;
      if (data.titlePhoto) await deleteFile(apiUrl, data.titlePhoto);
      if (data.photo) await deleteFile(apiUrl, data.photo);
   }
   return response;
};
