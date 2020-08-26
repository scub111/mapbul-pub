import { fetchUtils } from 'ra-core';
import { Options } from 'ra-core/esm/dataProvider/fetch';
import { P } from '@mapbul-pub/utils';
import { IAuthLogin } from '@mapbul-pub/types';

export const httpClient = fetchUtils.fetchJson;

export const httpClientToken = (url: string, options: Options = {}) => {
  if (!options.headers) {
      const headers = new Headers({ Accept: 'application/json' });
      const accessToken = localStorage.getItem(P<IAuthLogin>(p => p.access_token));
      headers.append('Authorization', `Bearer ${accessToken}`);
      console.log(111, 'headers');
      options.headers = headers;
  }
  return fetchUtils.fetchJson(url, options);
};
