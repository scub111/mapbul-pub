import { articlesActions } from 'actions';
import { makeUseList } from './utils';
import { Article } from 'models';
import { IRootState } from 'reducers';

export const useArticles = makeUseList<Article>((state: IRootState) => state.articles, articlesActions);
