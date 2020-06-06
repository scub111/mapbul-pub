import * as _ from 'lodash';
import { action, computed, observable } from 'mobx';
import { UserInfo } from 'models';
import { UserStore } from 'we-oauth2';
import { IStores, onAuthSuccessCb } from 'stores';
import { HttpResponseError, createError, sleep } from 'utils';
import { TRole, ICompany } from 'interfaces';
import stores from 'stores';
import { clearAll, clearProcessTracker } from 'services/transactionTracker';
import { api, ENDPOINTS, userService } from '../services';

const defaults = {};

export class UserStoreEx extends UserStore<UserInfo> {
  public stores: IStores;

  @computed public get roles(): TRole[] {
    return this.userInfo ? this.userInfo.businessRoles : [];
  }

  @computed public get inn(): string {
    const company = this.stores.catalogs.getCompanyById(
      this.userInfo.companyId,
    );

    return company.inn;
  }

  @observable public isLogouting = false;

  @observable public hasActiveRequests = false;

  @observable public redirectUrl: string = '';

  @action.bound
  public showErrorEx(error: HttpResponseError) {
    this.status = 'error';

    const errorCode = _.get(error, 'response.body.error');

    if (errorCode) {
      return Promise.reject(createError('AUTH_ERROR', errorCode));
    }

    return Promise.reject(error);
  }

  @action public loginEx(user: string, password: string): Promise<void> {
    return this.login(user, password)
      .then(() => {
        this.stores.routing.push('/temp');
      })
      .catch(this.showErrorEx);
  }

  @action public logoutEx(): Promise<void> {
    this.isLogouting = true;
    this.redirectUrl = '';

    return api
      .post(ENDPOINTS.logout())
      .finally(this.logout)
      .then(() => {
        this.isLogouting = false;

        Object.values(stores).forEach(store => store.clear && store.clear());
        clearAll();
        clearProcessTracker();

        return Promise.resolve();
      })
      .catch(this.showErrorEx);
  }

  get firstName(): string {
    return this.userInfo ? this.userInfo.firstName : '';
  }

  get lastName(): string {
    return this.userInfo ? this.userInfo.lastName : '';
  }

  get company(): ICompany | null {
    return this.userInfo
      ? (this.stores.catalogs.companies &&
          this.stores.catalogs.companies.find(
            (company: ICompany) => company.id === this.userInfo.companyId,
          )) ||
          ({} as ICompany)
      : null;
  }

  @action public setUser(data: Partial<UserStoreEx>) {
    Object.assign(this, data); // mobx set
  }

  @action public reset() {
    Object.assign(this, defaults);
  }

  public isContainRoles(roles: TRole[]) {
    return roles.every(role => this.roles.includes(role));
  }

  public isContainOneOfRoles(roles: TRole[]) {
    return roles.some(role => this.roles.includes(role));
  }

  public saveRedirectUrl(url: string) {
    if (!this.isAuthorized && url) {
      this.redirectUrl = url;
    }
  }

  private redirect() {
    const url =
      this.stores.routing.location.pathname +
      this.stores.routing.location.search;
    if (this.redirectUrl && url !== this.redirectUrl) {
      this.stores.routing.push(this.redirectUrl);
    }
  }

  @action.bound
  public checkActiveRequests = (inn: string = this.inn) => {
    return userService
      .hasActiveRequests(inn)
      .then(res => {
        this.hasActiveRequests = res.result;
      })
      .catch(err => {
        console.error(err.message);
        this.hasActiveRequests = false;
      });
  };

  @action.bound
  public onAuthSuccess: onAuthSuccessCb = async (userInfo: UserInfo) => {
    await this.stores.catalogs.getCompanies();
    await this.stores.catalogs.getDelayReasons();
    this.stores.processList.startProcessTracking();
    this.hasActiveRequests = false;

    if (userInfo.businessRoles.includes('CALLER')) {
      const company = this.stores.catalogs.getCompanyById(userInfo.companyId);
      await this.checkActiveRequests(company.inn);
    }

    if (userInfo.businessRoles.includes('ADMINISTRATOR')) {
      await Promise.all([
        this.stores.catalogs.getBusinessRoles(),
        this.stores.catalogs.getCompanyTypes(),
      ]);
    }

    this.stores.catalogs.fetchStatus = 'success';
    sleep(0).then(() => {
      this.redirect();
    });
  };
}
