import { IsDefined } from 'class-validator';
import { IStatusDTO } from '@mapbul-pub/types';

export class StatusDTO implements IStatusDTO {
  
  id: number;
  
  @IsDefined()
  tag: string;
  
  @IsDefined()
  description: string;
}
