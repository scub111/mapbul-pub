import { eventsActions } from 'actions';
import { Article } from 'models';
import { makePageReducer, makePageState } from './utils';

export const eventsState = makePageState<Article>();
export const eventsReducer = makePageReducer(eventsActions, eventsState);