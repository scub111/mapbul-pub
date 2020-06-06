import { ITokenEx, IUserInfo } from 'interfaces';
import { api } from 'services/api';
import { ENDPOINTS, SignResponse } from 'services';
import { TokenEx, UserInfo } from 'models';

export namespace userService {
  export function login(userName: string, password: string): Promise<TokenEx> {
    return api
      .login(userName, password)
      .then((data: ITokenEx) => TokenEx.New(data));
  }

  export function get(): Promise<IUserInfo> {
    return api
      .get(ENDPOINTS.userInfo())
      .then((data: IUserInfo) => UserInfo.New(data));
  }

  export function registerCompany(params: any) {
    return api.post(ENDPOINTS.registerCompany(), params);
  }

  export function registerCompanyIP(params: any) {
    return api.post(ENDPOINTS.registerCompanyIP(), params);
  }

  export function registerCompanySign(
    id: string,
    params: any,
  ): Promise<SignResponse> {
    return api.post(ENDPOINTS.registerCompanySign(), params);
  }

  export function hasActiveRequests(inn: string) {
    return api.get<{ result: boolean }>(ENDPOINTS.hasActiveRequests(), {
      inn,
    });
  }
}
