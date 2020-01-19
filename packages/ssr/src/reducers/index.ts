import { combineReducers } from 'redux';
import { Article } from 'models';
import { counterReducer, counterState, ICounterState } from './counterReducer';
import { articlesState, articlesReducer } from './articlesReducer';
import { eventsState, eventsReducer } from './eventsReducer';
import { IPageState } from './utils';

export interface IRootState {
  counter: ICounterState;
  articles: IPageState<Article>;
  events: IPageState<Article>;
}

export const rootState: IRootState = {
  counter: counterState,
  articles: articlesState,
  events: eventsState,
}

export const rootReducer = combineReducers({
  counter: counterReducer,
  articles: articlesReducer,
  events: eventsReducer
});

export * from './utils';