import { IsDefined } from 'class-validator';
import { ICountryPermissionDTO } from '@mapbul-pub/types';

export class CountryPermissionDTO implements ICountryPermissionDTO {
  
  id: number;
  
  @IsDefined()
  countryId: number;
  
  @IsDefined()
  userId: number;
}
