import { topArticlesActions } from 'actions';
import { Article } from 'models';
import { makePageReducer, makePageState } from './utils';

export const topArticlesState = makePageState<Article>();
export const topArticlesReducer = makePageReducer(topArticlesActions, topArticlesState);
