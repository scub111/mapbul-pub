import { IsDefined } from 'class-validator';
import { IMarkerDTO } from '@mapbul-pub/types';

export class MarkerDTO implements IMarkerDTO {
  id: number;

  @IsDefined()
  name: string;

  nameEn: string | null;

  @IsDefined()
  introduction: string;

  introductionEn: string | null;

  @IsDefined()
  description: string;

  descriptionEn: string | null;

  @IsDefined()
  cityId: number;

  @IsDefined()
  baseCategoryId: number;

  @IsDefined()
  lat: number;

  @IsDefined()
  lng: number;

  entryTicket: string | null;

  @IsDefined()
  discountId: number;

  @IsDefined()
  street: string;

  @IsDefined()
  house: string;

  buliding: string | null;

  floor: string | null;

  site: string | null;

  email: string | null;

  photo: string | null;

  // @IsDefined()
  userId: number;

  @IsDefined()
  addedDate: Date;

  publishedDate: Date | null;

  checkDate: Date | null;

  @IsDefined()
  statusId: number;

  logo: string | null;

  @IsDefined()
  wifi: boolean;

  @IsDefined()
  personal: boolean;
}
