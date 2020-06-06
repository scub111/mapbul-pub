import { AuthClient } from 'we-oauth2';
import { ENDPOINTS } from 'services/endpoints';
import { errorHandler } from './errorHandler';

const authApi = new AuthClient({ auth_url: ENDPOINTS.token() });

function extendWithErrorHandler(
  method:
    | AuthClient['patch']
    | AuthClient['post']
    | AuthClient['put']
    | AuthClient['del'],
) {
  return async <T>(url: string, params?: any) => {
    return method<T>(url, params).catch(e => errorHandler(e));
  };
}

export const api = {
  ...authApi,
  get: async <T>(url: string, params?: any) => {
    return authApi.get<T>(url, params).catch(e => errorHandler(e));
  },
  post: extendWithErrorHandler(authApi.post),
  patch: extendWithErrorHandler(authApi.patch),
  put: extendWithErrorHandler(authApi.put),
  del: extendWithErrorHandler(authApi.del),
} as AuthClient;
