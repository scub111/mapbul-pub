import { IsDefined } from 'class-validator';
import { ICountryDTO } from '@mapbul-pub/types';

export class CountryDTO implements ICountryDTO {
  id: number;

  @IsDefined()
  name: string;

  enName: string | null;

  placeId: string | null;

  @IsDefined()
  code: string;
}
