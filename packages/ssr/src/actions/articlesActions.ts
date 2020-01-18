import { createAction } from 'redux-actions';
import { Article } from 'models';

enum ArticlesActionType {
  INCREMENT_CURRENT_PAGE = 'INCREMENT_CURRENT_PAGE',
  SET_ARTICLES = 'SET_ARTICLES',
  ADD_ARTICLES = 'ADD_ARTICLES',
  SET_TOTAL_PAGES = 'SET_TOTAL_PAGES',
}

export const articlesActions = {
  incrementCurrentPage: createAction(ArticlesActionType.INCREMENT_CURRENT_PAGE),
  setArticles: createAction<Array<Article>>(ArticlesActionType.SET_ARTICLES),
  addArticles: createAction<Array<Article>>(ArticlesActionType.ADD_ARTICLES),
  setTotalPages: createAction<number>(ArticlesActionType.SET_TOTAL_PAGES),
};
