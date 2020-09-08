import { IsDefined } from 'class-validator';
import { IFavoritesMarkerDTO } from '@mapbul-pub/types';

export class FavoritesMarkerDTO implements IFavoritesMarkerDTO {
  id: number;

  @IsDefined()
  userId: number;

  @IsDefined()
  markerId: number;
}
