import { handleActions } from 'redux-actions';
import { articlesActions } from 'actions';
import { Article } from 'models';

export interface IArticlesState {
  list: Array<Article>;
}

export const articlesState: IArticlesState = {
  list: [],
};

export const articlesReducer = handleActions<IArticlesState, number & Array<Article>>(
  {
    [articlesActions.setArticles.toString()]: (state, { payload }) => {
      return {
        ...state,
        list: payload,
      };
    },
    [articlesActions.addArticles.toString()]: (state, { payload }) => {
      return {
        ...state,
        list: [...state.list, ...payload],
      };
    },
  },
  articlesState,
);