import { ICompany, IBusinessRole, ICompanyType, IRequestFormData } from 'interfaces';
import { Company } from 'models';
export declare namespace catalogService {
    function listCompanies(): Promise<Array<Company>>;
    function getCompanies(): Promise<Array<ICompany>>;
    function getDelayReasons(): Promise<any[]>;
    function getBusinessRoles(): Promise<Array<IBusinessRole>>;
    function getCompanyTypes(): Promise<Array<ICompanyType>>;
    function calculateLimits({ companyInn, personalCount, }: Pick<IRequestFormData, 'companyInn' | 'personalCount'>): Promise<{
        limit: number;
    }>;
}
