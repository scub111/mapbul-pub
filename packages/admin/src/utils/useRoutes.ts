import { useAppBaseName } from './app-basename';
import { Routes } from 'constants/routes';

export function useRoutes() {
  const basename = useAppBaseName();
  if (typeof basename !== 'string') return Routes;

  console.log({ basename });

  const prefixedRoutes = Object.entries(Routes).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: [basename,value].join('/'),
    }),
    {} as typeof Routes,
  );
  return prefixedRoutes;
}
