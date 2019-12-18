import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const getApiUrl = () => `${publicRuntimeConfig.BASE_URL}`;

export const ENDPOINTS = {
  articles: (page: number, size: number) => `${getApiUrl()}/articles?page=${page}&size=${size}`,
  article: (id: string) => `${getApiUrl()}/articles/${id}`,
};
