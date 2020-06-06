import { action, observable } from 'mobx';
import { statusFetching } from 'we-oauth2/lib/constants/types';
import { StoreConstructor } from './core/StoreConstructor';
import { catalogService } from 'services';
import { IDelayReason, ICompany, IBusinessRole, ICompanyType } from 'interfaces';

export class CatalogsStore extends StoreConstructor {
  @observable
  public fetchStatus: statusFetching = 'init';

  @observable companies: ICompany[];
  @observable delayReasons: IDelayReason[];
  @observable businessRoles: IBusinessRole[];
  @observable companyTypes: ICompanyType[];

  @action.bound
  statusHandler = <T>(actionFunc: () => Promise<T>) => {
    this.fetchStatus = 'fetching';

    return actionFunc()
      .then(res => {
        this.fetchStatus = 'success';

        return Promise.resolve(res);
      })
      .catch(err => {
        console.error(err);

        this.fetchStatus = 'error';

        throw err;
      });
  };

  getCompanies() {
    return this.statusHandler(() => catalogService.getCompanies()).then(res => {
      this.companies = res;
    });
  }

  getDelayReasons() {
    return this.statusHandler(() => catalogService.getDelayReasons()).then(
      res => {
        this.delayReasons = res;
      },
    );
  }

  getDelayReasonById = (id: number) => {
    const reason = this.delayReasons.find(r => r.id === id);
    return reason ? reason.value : id;
  };

  public getCompanyById(id: string) {
    return this.companies.find(org => org.id === id);
  }

  getBusinessRoles() {
    return this.statusHandler(() => catalogService.getBusinessRoles()).then(res => {
      this.businessRoles = res;
    });
  }

  getCompanyTypes() {
    return this.statusHandler(() => catalogService.getCompanyTypes()).then(res => {
      this.companyTypes = res;
    });
  }

  // @action.bound
  // public getCatalogs() {
  //   return Promise.all([
  //   ]).then(() => {
  //     this.fetchStatus = 'success';
  //   });
  // }
}
