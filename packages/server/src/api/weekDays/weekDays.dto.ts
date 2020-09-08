import { IsDefined } from 'class-validator';
import { IWeekDayDTO } from '@mapbul-pub/types';

export class WeekDayDTO implements IWeekDayDTO {
  
  id: number;
  
  @IsDefined()
  tag: string;
  
  @IsDefined()
  description: string;
  
  descriptionEn: string | null;
}
