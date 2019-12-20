import getConfig from "next/config";
import { Routes } from 'constants/routes';

const { publicRuntimeConfig } = getConfig();


const getApiUrl = () => `${publicRuntimeConfig.BASE_URL}`;

export interface IEndpointFn {
  list: (page: number, size: number) => string;
  get: (id: string) => string;
}

const getEndpointFn = (endpoint: string): IEndpointFn => {
  return {
    list: (page: number, size: number) => `${getApiUrl()}/${endpoint}?page=${page}&size=${size}`,
    get: (id: string) => `${getApiUrl()}/${endpoint}/${id}`
  }
}

export const ENDPOINTS: Record<string, IEndpointFn> = {
  articles: getEndpointFn(Routes.articles),
  categories: getEndpointFn(Routes.categories),
};
