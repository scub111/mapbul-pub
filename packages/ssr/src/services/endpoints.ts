import getConfig from "next/config";
import { Routes } from 'constants/routes';

const { publicRuntimeConfig } = getConfig();
const getApiUrl = () => `${publicRuntimeConfig.BASE_URL}`;

export interface IEndpointFn {
  list: (page?: number, size?: number, filter?: string) => string;
  get: (id: string | number) => string;
}

const getEndpointFn = (endpoint: string): IEndpointFn => {
  return {
    list: (page?: number, size?: number, filter?: string) => page && size ?
      `${getApiUrl()}/${endpoint}?page=${page}&size=${size}&filter=${filter}` :
      `${getApiUrl()}/${endpoint}&filter=${filter}`,
    get: (id: string | number) => `${getApiUrl()}/${endpoint}/${id}`
  }
}

export const ENDPOINTS: Record<string, IEndpointFn> = {
  admins: getEndpointFn(Routes.admins),
  articles: getEndpointFn(Routes.articles),
  categories: getEndpointFn(Routes.categories),
  editors: getEndpointFn(Routes.editors),
  users: getEndpointFn(Routes.users),
  userTypes: getEndpointFn(Routes.userTypes),
};
