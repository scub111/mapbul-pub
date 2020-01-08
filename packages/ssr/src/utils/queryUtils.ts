import { ParsedUrlQuery } from 'querystring';

export const getQueryPage = (query: ParsedUrlQuery): number => {
  if (query.page) {
    return Number(query.page);
  }
  return 1;
};
