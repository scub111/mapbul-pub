import { IsDefined } from 'class-validator';
import { ICityPermissionDTO } from '@mapbul-pub/types';

export class CityPermissionDTO implements ICityPermissionDTO {
  
  id: number;
  
  @IsDefined()
  cityId: number;
  
  @IsDefined()
  userId: number;
}
