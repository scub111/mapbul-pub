import { useRouter } from 'next/router';
import { Routes, TypeRoutes } from '../constants';

let cacheMatch: TypeRoutes = 'unknown';

export const useTypeRoutes = (): TypeRoutes => {
  const router = useRouter();
  const keys = Object.keys(Routes);
  if (cacheMatch !== 'unknown' && router.pathname.includes(cacheMatch)) {
    return cacheMatch;
  }
  const match = keys.find(key => router.pathname.includes(key));
  cacheMatch = match ? Routes[match] : 'unknown'
  return cacheMatch;
}