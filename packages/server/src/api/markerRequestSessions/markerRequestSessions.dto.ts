import { IsDefined } from 'class-validator';
import { IMarkerRequestSessionDTO } from '@mapbul-pub/types';

export class MarkerRequestSessionDTO implements IMarkerRequestSessionDTO {
  id: number;

  @IsDefined()
  sessionId: string;

  @IsDefined()
  markerId: number;
}
