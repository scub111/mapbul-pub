import { AuthProvider } from 'ra-core';
import { IAuthLogin } from '@mapbul-pub/types';
import { P } from '@mapbul-pub/utils';
import { GlobalVar } from './constants';

const authProvider: AuthProvider = {
   login: ({ username, password }) => {
      // localStorage.setItem('username', username);
      // // accept all username/password combinations
      // return Promise.resolve();

      const request = new Request(`${GlobalVar.env.baseUrl}/auth/token`, {
         method: 'POST',
         body: JSON.stringify({ username, password }),
         headers: new Headers({ 'Content-Type': 'application/json' })
      });
      return fetch(request)
         .then((response) => {
            if (response.status < 200 || response.status >= 300) {
               throw new Error(response.statusText);
            }
            return response.json();
         })
         .then(({ token: access_token }: IAuthLogin) => {
            localStorage.setItem(
               P<IAuthLogin>((p) => p.token),
               access_token
            );
         });
   },
   logout: () => {
      localStorage.removeItem(P<IAuthLogin>((p) => p.token));
      return Promise.resolve();
   },
   checkError: () => Promise.resolve(),
   checkAuth: () =>
      localStorage.getItem(P<IAuthLogin>((p) => p.token)) ? Promise.resolve() : Promise.reject(),
   getPermissions: () => Promise.reject('Unknown method')
};

export default authProvider;
