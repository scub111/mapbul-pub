import { IsDefined } from 'class-validator';
import { IAdminDTO } from '@mapbul-pub/types';

export class AdminDTO implements IAdminDTO {
  
  id: number;
  
  @IsDefined()
  userId: number;
  
  @IsDefined()
  superuser: boolean;
}
