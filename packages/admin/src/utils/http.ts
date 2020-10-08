import { fetchUtils } from 'ra-core';
import { Options } from 'ra-core/esm/dataProvider/fetch';
import { P } from '@mapbul-pub/utils';
import { IAuthLogin } from '@mapbul-pub/types';

export const httpClient = fetchUtils.fetchJson;

export const httpClientToken = (url: string, options: Options = {}) => {
   if (!options.headers) {
      const headers = new Headers({ Accept: 'application/json' });
      const token = localStorage.getItem(P<IAuthLogin>((p) => p.token));
      headers.append('Authorization', `Bearer ${token}`);
      options.headers = headers;
   }
   return fetchUtils.fetchJson(url, options);
};
