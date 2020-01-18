import { handleActions } from 'redux-actions';
import { articlesActions } from 'actions';
import { Article } from 'models';

export interface IArticlesState {
  currentPage: number;
  list: Array<Article>;
  totalPages: number;
}

export const articlesState: IArticlesState = {
  currentPage: 1,
  list: [],
  totalPages: 0,
};

export const articlesReducer = handleActions<IArticlesState, number & Array<Article>>(
  {
    [articlesActions.incrementCurrentPage.toString()]: (state) => {
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    },
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
    [articlesActions.setTotalPages.toString()]: (state, { payload }) => {
      return {
        ...state,
        totalPages: payload,
      };
    },
  },
  articlesState,
);