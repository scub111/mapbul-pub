import { UserInfo } from 'models';
import { UserStore } from 'we-oauth2';
import { IStores, onAuthSuccessCb } from 'stores';
import { HttpResponseError } from 'utils';
import { TRole, ICompany } from 'interfaces';
export declare class UserStoreEx extends UserStore<UserInfo> {
    stores: IStores;
    get roles(): TRole[];
    get inn(): string;
    isLogouting: boolean;
    hasActiveRequests: boolean;
    redirectUrl: string;
    showErrorEx(error: HttpResponseError): Promise<never>;
    loginEx(user: string, password: string): Promise<void>;
    logoutEx(): Promise<void>;
    get firstName(): string;
    get lastName(): string;
    get company(): ICompany | null;
    setUser(data: Partial<UserStoreEx>): void;
    reset(): void;
    isContainRoles(roles: TRole[]): boolean;
    isContainOneOfRoles(roles: TRole[]): boolean;
    saveRedirectUrl(url: string): void;
    private redirect;
    checkActiveRequests: (inn?: string) => Promise<void>;
    onAuthSuccess: onAuthSuccessCb;
}
