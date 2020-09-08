import { IsDefined } from 'class-validator';
import { IArticleSubcategoryDTO } from '@mapbul-pub/types';

export class ArticleSubcategoryDTO implements IArticleSubcategoryDTO {
  
  id: number;
  
  @IsDefined()
  articleId: number;
  
  @IsDefined()
  categoryId: number;
}
