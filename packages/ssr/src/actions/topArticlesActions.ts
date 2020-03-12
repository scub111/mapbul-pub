import { Article } from 'models';
import { makePageActions } from './utils';

export const topArticlesActions = makePageActions<Article>('TOP_ARTICLES');
