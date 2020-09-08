import { IsDefined } from 'class-validator';
import { IMarkerPhotosDTO } from '@mapbul-pub/types';

export class MarkerPhotosDTO implements IMarkerPhotosDTO {
  id: number;

  @IsDefined()
  markerId: number;

  photo: string | null;

  photoMini: string | null;
}
