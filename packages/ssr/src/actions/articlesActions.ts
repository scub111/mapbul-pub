import { createAction } from 'redux-actions';
import { Article } from 'models';

enum ArticlesActionType {
  SET_ARTICLES = 'SET_ARTICLES',
  ADD_ARTICLES = 'ADD_ARTICLES',
}

export const articlesActions = {
  setArticles: createAction<Array<Article>>(ArticlesActionType.SET_ARTICLES),
  addArticles: createAction<Array<Article>>(ArticlesActionType.ADD_ARTICLES),
};
