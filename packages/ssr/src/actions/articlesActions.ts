import { Article } from 'models';
import { makePageActions } from './utils';

export const articlesActions = makePageActions<Article>('ARTICLES');
