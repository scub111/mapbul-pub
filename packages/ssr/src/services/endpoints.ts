import getConfig from 'next/config';
import { Routes } from '@mapbul-pub/ui';
import { IGetAllQuery } from '@mapbul-pub/types';
import { isClient } from 'utils';
import { createPath } from '@mapbul-pub/utils';

const { publicRuntimeConfig } = getConfig();

//To verify BASE_URL for reloading specific page
console.log(`BASE_URL_FRONT = ${publicRuntimeConfig.BASE_URL_FRONT}`);
console.log(`BASE_URL_SERVER = ${publicRuntimeConfig.BASE_URL_SERVER}`);
const getApiUrl = () => (isClient ? `${publicRuntimeConfig.BASE_URL_FRONT}` : `${publicRuntimeConfig.BASE_URL_SERVER}`);

export interface IEndpointFn {
  list: (query: IGetAllQuery) => string;
  get: (id: string | number) => string;
}

const getEndpointFn = (endpoint: string): IEndpointFn => {
  return {
    list: ({ page, size, filter, sort }) =>
      createPath({
        endpoint: `${getApiUrl()}/${endpoint}`,
        queryParams: { page, size, filter, sort },
      }),
    get: (id: string | number) => `${getApiUrl()}/${endpoint}/${id}`,
  };
};

export const ENDPOINTS: Record<string, IEndpointFn> = {
  admins: getEndpointFn(Routes.admins),
  articles: getEndpointFn(Routes.articles),
  markers: getEndpointFn(Routes.markers),
  categories: getEndpointFn(Routes.categories),
  editors: getEndpointFn(Routes.editors),
  guides: getEndpointFn(Routes.guides),
  journalists: getEndpointFn(Routes.journalists),
  tenants: getEndpointFn(Routes.tenants),
  users: getEndpointFn(Routes.users),
  userTypes: getEndpointFn(Routes.usertypes),
};
