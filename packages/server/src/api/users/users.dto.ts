import { IsDefined } from 'class-validator';
import { IUserDTO } from '@mapbul-pub/types';

export class UserDTO implements IUserDTO {
  id: number;

  @IsDefined()
  email: string;

  @IsDefined()
  password: string;

  @IsDefined()
  guid: string;

  @IsDefined()
  userTypeId: number;

  @IsDefined()
  registrationDate: Date;

  @IsDefined()
  deleted: boolean;
}
