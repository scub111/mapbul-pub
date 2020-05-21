import { BaseService } from './BaseService';
import { Marker } from 'models';
import { ENDPOINTS } from './endpoints';
import { IMarkerDTO } from '@mapbul-pub/types';
// import {
//   categoriesService,
//   usersService,
//   userTypesService,
//   editorsService,
//   journalistsService,
//   guidesService,
//   tenantsService,
// } from '.';
// import { UserDescription } from 'interfaces';
// import { GlobalVar } from '../config';


class MarkersService extends BaseService<IMarkerDTO, Marker> {
  constructor() {
    super(
      ENDPOINTS.markers,
      async marker => {
        return Marker.New(marker);
      },
    );
  }
}

export const markersService = new MarkersService();
