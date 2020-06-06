/// <reference types="react" />
/// <reference types="@emotion/core" />
import { statusFetching } from 'we-oauth2/lib/constants/types';
import { StoreConstructor } from './core/StoreConstructor';
import { IDelayReason, ICompany, IBusinessRole, ICompanyType } from 'interfaces';
export declare class CatalogsStore extends StoreConstructor {
    fetchStatus: statusFetching;
    companies: ICompany[];
    delayReasons: IDelayReason[];
    businessRoles: IBusinessRole[];
    companyTypes: ICompanyType[];
    statusHandler: <T>(actionFunc: () => Promise<T>) => Promise<T>;
    getCompanies(): Promise<void>;
    getDelayReasons(): Promise<void>;
    getDelayReasonById: (id: number) => import("react").ReactText;
    getCompanyById(id: string): ICompany;
    getBusinessRoles(): Promise<void>;
    getCompanyTypes(): Promise<void>;
}
