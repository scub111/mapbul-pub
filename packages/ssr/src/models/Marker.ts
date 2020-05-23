import getConfig from 'next/config';
import { IMarkerDTO } from '@mapbul-pub/types';
import { clearUrl } from 'utils';
import { UserDescription } from 'interfaces';
import { Category } from '.';

const { publicRuntimeConfig } = getConfig();

export class Marker implements IMarkerDTO {
  public static async New(init: IMarkerDTO, category?: Category, userDescription?: UserDescription) {
    const newMarker = new Marker(init);
    newMarker.category = category;
    newMarker.userDescription = userDescription;
    return newMarker;
  }

  id: number;
  name: string;
  nameEn: string | null;
  introduction: string;
  introductionEn: string | null;
  description: string;
  descriptionEn: string | null;
  cityId: number;
  baseCategoryId: number;
  lat: number;
  lng: number;
  entryTicket: string | null;
  discountId: number;
  street: string;
  house: string;
  buliding: string | null;
  floor: string | null;
  site: string | null;
  email: string | null;
  photo: string | null;
  userId: number;
  addedDate: Date;
  publishedDate: Date | null;
  checkDate: Date | null;
  statusId: number;
  logo: string | null;
  wifi: boolean;
  personal: boolean;

  category: Category | undefined;
  userDescription: UserDescription | undefined;
  
  public constructor(init: IMarkerDTO) {
    this.id = init.id;
    this.name = init.name;
    this.nameEn = init.nameEn;
    this.introduction = init.introduction;
    this.introductionEn = init.introductionEn;
    this.description = init.description;
    this.descriptionEn = init.descriptionEn;
    this.cityId = init.cityId;
    this.baseCategoryId = init.baseCategoryId;
    this.lat = init.lat;
    this.lng = init.lng;
    this.entryTicket = init.entryTicket;
    this.discountId = init.discountId;
    this.street = init.street;
    this.house = init.house;
    this.buliding = init.buliding;
    this.floor = init.floor;
    this.site = init.site;
    this.email = init.email;
    this.photo = init.photo ? clearUrl(`${publicRuntimeConfig.IMAGE_URL}/${init.photo}`) : null;
    this.userId = init.userId;
    this.addedDate = init.addedDate;
    this.publishedDate = init.publishedDate;
    this.checkDate = init.checkDate;
    this.statusId = init.statusId;
    this.logo = init.logo;
    this.wifi = init.wifi;
    this.personal = init.personal;
  }
}
