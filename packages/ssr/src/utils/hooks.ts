import { useRouter } from 'next/router';
import { Routes } from '../constants';
export type PageType = 'ar'
export const usePageType = (): Routes => {
  const router = useRouter();
  console.log(router);
  return Routes.admins;
}