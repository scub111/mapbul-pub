import { combineReducers } from 'redux';
import { Article, Marker } from 'models';
import { counterReducer, counterState, ICounterState } from './counterReducer';
import { articlesState, articlesReducer } from './articlesReducer';
import { eventsState, eventsReducer } from './eventsReducer';
import { IPageState } from './utils';
import { topArticlesState, topArticlesReducer } from './topArticlesReducer';
import { topEventsState, topEventsReducer } from './topEventsReducer';
import { markersState, markersReducer } from './markersReducer';

export interface IRootState {
  counter: ICounterState;
  articles: IPageState<Article>;
  events: IPageState<Article>;
  markers: IPageState<Marker>;
  topArticles: IPageState<Article>;
  topEvents: IPageState<Article>;
}

export const rootState: IRootState = {
  counter: counterState,
  articles: articlesState,
  events: eventsState,
  markers: markersState,
  topArticles: topArticlesState,
  topEvents: topEventsState,
};

export const rootReducer = combineReducers({
  counter: counterReducer,
  articles: articlesReducer,
  events: eventsReducer,
  markers: markersReducer,
  topArticles: topArticlesReducer,
  topEvents: topEventsReducer,
});

export * from './utils';
