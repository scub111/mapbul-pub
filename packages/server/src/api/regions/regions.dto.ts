import { IsDefined } from 'class-validator';
import { IRegionDTO } from '@mapbul-pub/types';

export class RegionDTO implements IRegionDTO {
  id: number;

  @IsDefined()
  countryId: number;

  @IsDefined()
  name: string;

  placeId: string | null;
}
