import { useRouter } from 'next/router';
import { Routes, TypeRoute } from '@mapbul-pub/ui';
import { TLangs } from 'config';

let cacheMatch: TypeRoute = 'unknown';

export const useTypeRoute = (): TypeRoute => {
  const router = useRouter();
  const keys = Object.keys(Routes);
  if (cacheMatch !== 'unknown' && router.pathname.includes(cacheMatch)) {
    return cacheMatch;
  }
  const match = keys.find(key => router.pathname.includes(key));
  cacheMatch = match ? (Routes as any)[match] : 'unknown';
  return cacheMatch;
};

export const useLang = (): TLangs => {
  const router = useRouter();
  const { lang } = router.query;
  return lang as TLangs;
};
