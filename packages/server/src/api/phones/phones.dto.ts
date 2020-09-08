import { IsDefined } from 'class-validator';
import { IPhoneDTO } from '@mapbul-pub/types';

export class PhoneDTO implements IPhoneDTO {
  id: number;

  @IsDefined()
  number: string;

  @IsDefined()
  markerId: number;

  @IsDefined()
  primary: boolean;
}
