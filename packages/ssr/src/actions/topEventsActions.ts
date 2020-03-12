import { Article } from 'models';
import { makePageActions } from './utils';

export const topEventsActions = makePageActions<Article>('TOP_EVENTS');
