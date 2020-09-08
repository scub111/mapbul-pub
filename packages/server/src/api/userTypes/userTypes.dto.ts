import { IsDefined } from 'class-validator';
import { IUserTypeDTO } from '@mapbul-pub/types';

export class UserTypeDTO implements IUserTypeDTO {
  id: number;

  @IsDefined()
  tag: string;

  @IsDefined()
  description: string;
}
