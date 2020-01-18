import { handleActions } from 'redux-actions';
import { counterActions } from 'actions';
import { Article } from 'models';

export interface IArticlesState {
  lastUpdate: number;
  light: boolean;
  count: number;
  list: Array<Article>;
}

export const articlesState: IArticlesState = {
  lastUpdate: 0,
  light: false,
  count: 10,
  list: [],
};

export const articlesReducer = handleActions<IArticlesState, number & Array<Article>>(
  {
    [counterActions.increment.toString()]: state => {
      return {
        ...state,
        count: state.count + 1,
      };
    },
    [counterActions.decrement.toString()]: state => {
      return {
        ...state,
        count: state.count - 1,
      };
    },
    [counterActions.reset.toString()]: state => {
      return {
        ...state,
        count: 0,
      };
    },
    [counterActions.set.toString()]: (state, { payload }) => {
      return {
        ...state,
        count: payload,
      };
    },
    [counterActions.setArticles.toString()]: (state, { payload }) => {
      return {
        ...state,
        list: payload,
      };
    },
    [counterActions.addArticles.toString()]: (state, { payload }) => {
      return {
        ...state,
        list: [...state.list, ...payload],
      };
    },
  },
  articlesState,
);