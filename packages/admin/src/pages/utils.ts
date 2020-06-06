import { useLocation } from 'react-router';
import { useRoutes } from 'utils/useRoutes';

export const useIsLoginRoute = () => {
  const { pathname } = useLocation();
  const { login } = useRoutes();

  return pathname === `/${login}`;
};
