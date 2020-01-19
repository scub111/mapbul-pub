import { eventsActions } from 'actions';
import { makeUseList } from './utils';
import { Article } from 'models';
import { IRootState } from 'reducers';

export const useEvents = makeUseList<Article>((state: IRootState) => state.events, eventsActions);
