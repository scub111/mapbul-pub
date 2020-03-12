import { combineReducers } from 'redux';
import { Article } from 'models';
import { counterReducer, counterState, ICounterState } from './counterReducer';
import { articlesState, articlesReducer } from './articlesReducer';
import { eventsState, eventsReducer } from './eventsReducer';
import { IPageState } from './utils';
import { topArticlesState, topArticlesReducer } from './topArticlesReducer';
import { topEventsState, topEventsReducer } from './topEventsReducer';

export interface IRootState {
  counter: ICounterState;
  articles: IPageState<Article>;
  events: IPageState<Article>;
  topArticles: IPageState<Article>;
  topEvents: IPageState<Article>;
}

export const rootState: IRootState = {
  counter: counterState,
  articles: articlesState,
  events: eventsState,
  topArticles: topArticlesState,
  topEvents: topEventsState,
};

export const rootReducer = combineReducers({
  counter: counterReducer,
  articles: articlesReducer,
  events: eventsReducer,
  topArticles: topArticlesReducer,
  topEvents: topEventsReducer,
});

export * from './utils';
