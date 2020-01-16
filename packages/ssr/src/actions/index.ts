import { createAction } from 'redux-actions';
import { Article } from 'models';

enum CounterActionType {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  RESET = 'RESET',
  SET = 'SET',
  SET_ARTICLES = 'SET_ARTICLES',
  ADD_ARTICLES = 'ADD_ARTICLES',
}

export const counterActions = {
  increment: createAction(CounterActionType.INCREMENT),
  decrement: createAction(CounterActionType.DECREMENT),
  reset: createAction(CounterActionType.RESET),
  set: createAction<number>(CounterActionType.SET),
  setArticles: createAction<Array<Article>>(CounterActionType.SET_ARTICLES),
  addArticles: createAction<Array<Article>>(CounterActionType.ADD_ARTICLES),
};
