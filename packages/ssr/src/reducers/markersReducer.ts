import { markersActions } from 'actions';
import { Marker } from 'models';
import { makePageReducer, makePageState } from './utils';

export const markersState = makePageState<Marker>();
export const markersReducer = makePageReducer(markersActions, markersState);
