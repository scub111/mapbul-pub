import { IsDefined } from 'class-validator';
import { IWorkTimeDTO } from '@mapbul-pub/types';

export class WorkTimeDTO implements IWorkTimeDTO {
  
  id: number;
  
  @IsDefined()
  openTime: Date;
  
  @IsDefined()
  closeTime: Date;
  
  @IsDefined()
  markerId: number;
  
  @IsDefined()
  weekDayId: number;
}
