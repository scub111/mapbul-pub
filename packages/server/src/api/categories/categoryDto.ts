import { IsNotEmpty, IsDefined } from 'class-validator';
import { ICategoryDTO } from '@mapbul-pub/types';

export class CategoryDto implements ICategoryDTO {
  id: number;

  @IsDefined()
  name: string;

  enName: string | null;

  parentId: number | null;

  addedDate: Date;

  icon: string;

  //@IsDefined()
  @IsNotEmpty()
  color: string;

  pin: string;

  forArticle: boolean;
}