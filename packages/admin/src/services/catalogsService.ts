import { api } from 'services/api';
import { ENDPOINTS } from 'services';
import {
  ICompany,
  IBusinessRole,
  ICompanyType,
  IRequestFormData,
} from 'interfaces';
import { Company } from 'models';

export namespace catalogService {
  export function listCompanies(): Promise<Array<Company>> {
    return api.get<Array<ICompany>>(ENDPOINTS.companies());
  }

  export function getCompanies(): Promise<Array<ICompany>> {
    return api.get<Array<ICompany>>(ENDPOINTS.companies());
  }

  export function getDelayReasons() {
    // return api.get<Array<IDelayReason>>(ENDPOINTS.dictDelayReasons());
    return Promise.resolve([]);
  }

  export function getBusinessRoles(): Promise<Array<IBusinessRole>> {
    return api.get<Array<IBusinessRole>>(ENDPOINTS.businessRoles());
  }

  export function getCompanyTypes(): Promise<Array<ICompanyType>> {
    return api.get<Array<ICompanyType>>(ENDPOINTS.companyTypes());
  }

  export function calculateLimits({
    companyInn,
    personalCount,
  }: Pick<IRequestFormData, 'companyInn' | 'personalCount'>): Promise<{
    limit: number;
  }> {
    return api.get(ENDPOINTS.calculateLimit({ companyInn, personalCount }));
  }
}
