import { topEventsActions } from 'actions';
import { Article } from 'models';
import { makePageReducer, makePageState } from './utils';

export const topEventsState = makePageState<Article>();
export const topEventsReducer = makePageReducer(topEventsActions, topEventsState);
