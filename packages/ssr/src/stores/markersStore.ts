import { markersActions } from 'actions';
import { makeUseList } from './utils';
import { Marker } from 'models';
import { IRootState } from 'reducers';

export const useMarkers = makeUseList<Marker>((state: IRootState) => state.markers, markersActions);
