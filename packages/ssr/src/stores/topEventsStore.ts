import { topEventsActions } from 'actions';
import { makeUseList } from './utils';
import { Article } from 'models';
import { IRootState } from 'reducers';

export const useTopEvents = makeUseList<Article>((state: IRootState) => state.topEvents, topEventsActions);