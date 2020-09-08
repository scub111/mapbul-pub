import { IsDefined } from 'class-validator';
import { IRegionPermissionDTO } from '@mapbul-pub/types';

export class RegionPermissionDTO implements IRegionPermissionDTO {
  id: number;

  @IsDefined()
  regionId: number;

  @IsDefined()
  userId: number;
}
