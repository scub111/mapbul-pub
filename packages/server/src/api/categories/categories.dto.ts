import { IsDefined } from 'class-validator';
import { ICategoryDTO } from '@mapbul-pub/types';

export class CategoryDTO implements ICategoryDTO {
  
  id: number;
  
  @IsDefined()
  name: string;
  
  enName: string | null;
  
  parentId: number | null;
  
  @IsDefined()
  addedDate: Date;
  
  @IsDefined()
  icon: string;
  
  @IsDefined()
  color: string;
  
  @IsDefined()
  pin: string;
  
  @IsDefined()
  forArticle: boolean;
}
