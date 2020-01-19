import { Article } from 'models';
import { makePageActions } from './utils';

export const eventsActions = makePageActions<Article>('EVENTS');
