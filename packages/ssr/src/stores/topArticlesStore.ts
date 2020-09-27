import { topArticlesActions } from 'actions';
import { makeUseList } from './utils';
import { Article } from 'models';
import { IRootState } from 'reducers';

export const useTopArticles = makeUseList<Article>(
  (state: IRootState) => state.topArticles,
  topArticlesActions,
);
