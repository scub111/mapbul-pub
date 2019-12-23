import getConfig from "next/config";
import { Routes } from 'constants/routes';
import { IGetAllQuery } from '@mapbul-pub/types';

const { publicRuntimeConfig } = getConfig();
const getApiUrl = () => `${publicRuntimeConfig.BASE_URL}`;

interface PathConfig {
  endpoint: string;
  queryParams?: { [key: string]: string | number | undefined };
}

export const createPath = ({ endpoint, queryParams }: PathConfig) => {
  let searchString = null;
  if (queryParams) {
    const params = new URLSearchParams();
    Object.keys(queryParams).forEach(paramName => {
      if (queryParams[paramName] != null) {
        params.append(paramName, String(queryParams[paramName]));
      }
    });
    searchString = params.toString();
  }
  if (searchString) {
    return `${endpoint}?${searchString}`;
  }
  return endpoint;
}

export interface IEndpointFn {
  list: (query: IGetAllQuery) => string;
  get: (id: string | number) => string;
}

const getEndpointFn = (endpoint: string): IEndpointFn => {
  return {
    list: ({ page, size, filter }) => createPath(
      {
        endpoint: `${getApiUrl()}/${endpoint}`,
        queryParams: { page, size, filter }
      }
    ),
    get: (id: string | number) => `${getApiUrl()}/${endpoint}/${id}`
  }
}

export const ENDPOINTS: Record<string, IEndpointFn> = {
  admins: getEndpointFn(Routes.admins),
  articles: getEndpointFn(Routes.articles),
  categories: getEndpointFn(Routes.categories),
  editors: getEndpointFn(Routes.editors),
  guides: getEndpointFn(Routes.guides),
  journalists: getEndpointFn(Routes.journalists),
  tenants: getEndpointFn(Routes.tenants),
  users: getEndpointFn(Routes.users),
  userTypes: getEndpointFn(Routes.userTypes),
};
