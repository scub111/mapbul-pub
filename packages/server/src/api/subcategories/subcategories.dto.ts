import { IsDefined } from 'class-validator';
import { ISubcategoryDTO } from '@mapbul-pub/types';

export class SubcategoryDTO implements ISubcategoryDTO {
  id: number;

  @IsDefined()
  markerId: number;

  @IsDefined()
  categoryId: number;
}
