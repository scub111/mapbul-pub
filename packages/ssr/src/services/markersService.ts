import { BaseService } from './BaseService';
import { Marker } from 'models';
import { ENDPOINTS } from './endpoints';
import { IMarkerDTO } from '@mapbul-pub/types';
import { usersService } from '.';
import { getUserDescription } from './utils';

class MarkersService extends BaseService<IMarkerDTO, Marker> {
  constructor() {
    super(
      ENDPOINTS.markers,
      async marker => {
        return Marker.New(marker);
      },
      async marker => {
        const [user] = await Promise.all([usersService.get(marker.userId)]);
        return Marker.New(marker, await getUserDescription(user));
      },
    );
  }
}

export const markersService = new MarkersService();
