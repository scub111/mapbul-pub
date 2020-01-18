import { combineReducers } from 'redux';
import { articlesReducer, articlesState, IArticlesState } from './articlesReducer';

export interface IRootState {
  articles: IArticlesState
}

export const rootState = {
  articles: articlesState,
}

export const rootReducer = combineReducers({
  articles: articlesReducer
});
