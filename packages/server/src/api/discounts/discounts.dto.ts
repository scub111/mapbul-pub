import { IsDefined } from 'class-validator';
import { IDiscountDTO } from '@mapbul-pub/types';

export class DiscountDTO implements IDiscountDTO {
  id: number;

  @IsDefined()
  value: number;
}
