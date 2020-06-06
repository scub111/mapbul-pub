import { IUserInfo } from 'interfaces';
import { SignResponse } from 'services';
import { TokenEx } from 'models';
export declare namespace userService {
    function login(userName: string, password: string): Promise<TokenEx>;
    function get(): Promise<IUserInfo>;
    function registerCompany(params: any): Promise<unknown>;
    function registerCompanyIP(params: any): Promise<unknown>;
    function registerCompanySign(id: string, params: any): Promise<SignResponse>;
    function hasActiveRequests(inn: string): Promise<{
        result: boolean;
    }>;
}
