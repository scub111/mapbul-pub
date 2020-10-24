import { IsDefined } from 'class-validator';
import { ICityDTO } from '@mapbul-pub/types';

export class CityDTO implements ICityDTO {
  id: number;

  @IsDefined()
  name: string;

  @IsDefined()
  lng: number;

  @IsDefined()
  lat: number;

  @IsDefined()
  countryId: number;

  @IsDefined()
  placeId: string;

  nameEn: string | null;
}
