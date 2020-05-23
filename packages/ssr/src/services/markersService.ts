import { BaseService } from './BaseService';
import { Marker } from 'models';
import { ENDPOINTS } from './endpoints';
import { IMarkerDTO } from '@mapbul-pub/types';
import { usersService, categoriesService } from '.';
import { getUserDescription } from './utils';

class MarkersService extends BaseService<IMarkerDTO, Marker> {
  constructor() {
    super(
      ENDPOINTS.markers,
      async marker => {
        return Marker.New(marker);
      },
      async marker => {
        const [category, user] = await Promise.all([
          categoriesService.get(marker.baseCategoryId),
          usersService.get(marker.userId),
        ]);
        return Marker.New(marker, category, await getUserDescription(user));
      },
    );
  }
}

export const markersService = new MarkersService();
