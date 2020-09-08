import { IsDefined } from 'class-validator';
import { IFavoritesArticleDTO } from '@mapbul-pub/types';

export class FavoritesArticleDTO implements IFavoritesArticleDTO {
  
  id: number;
  
  @IsDefined()
  userId: number;
  
  @IsDefined()
  articleId: number;
}
