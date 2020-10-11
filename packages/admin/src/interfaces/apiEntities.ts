import { ICategoryDTO, IArticleDTO, IMarkerDTO } from '@mapbul-pub/types';

export interface ICategoryDTOEx extends ICategoryDTO {
   iconFile: any;
   pinFile: any;
}

export interface IArticleDTOEx extends IArticleDTO {
   photoFile: any;
   titlePhotoFile: any;
}

export interface IMarkerDTOEx extends IMarkerDTO {
   photoFile: any;
   logoFile: any;
}
