import { IsDefined } from 'class-validator';
import { ITenantDTO } from '@mapbul-pub/types';

export class TenantDTO implements ITenantDTO {
  id: number;

  @IsDefined()
  userId: number;

  firstName: string | null;

  middleName: string | null;

  lastName: string | null;

  gender: string | null;

  phone: string | null;

  birthDate: Date | null;

  address: string | null;
}
