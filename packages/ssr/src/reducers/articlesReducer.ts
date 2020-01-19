import { articlesActions } from 'actions';
import { Article } from 'models';
import { makePageReducer, makePageState } from './utils';

export const articlesState = makePageState<Article>();
export const articlesReducer = makePageReducer(articlesActions, articlesState);