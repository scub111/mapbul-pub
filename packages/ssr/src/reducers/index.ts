import { combineReducers } from 'redux';
import { counterReducer, counterState, ICounterState } from './counterReducer';
import { articlesReducer, articlesState, IArticlesState } from './articlesReducer';

export interface IRootState {
  counter: ICounterState;
  articles: IArticlesState;
}

export const rootState = {
  counter: counterState,
  articles: articlesState,
}

export const rootReducer = combineReducers({
  counter: counterReducer,
  articles: articlesReducer
});
