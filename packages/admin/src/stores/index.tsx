import RouterStore from 'stores/RouterStore';
import { UserStoreEx } from 'stores/UserStore';
import { UserInfo } from 'models';
import { api } from 'services';
import { IUserInfo } from 'interfaces';
import { ENDPOINTS } from 'services';
import { createStoresContext } from 'we-data-layer/lib/connect';
import { ProcessListStore } from './ProcessListStore';
import { ModalsStore } from './ModalsStore';
import { CatalogsStore } from './CatalogsStore';
import { ActiveProcessStore } from './ActiveProcessStore';
import { OperationHistoryListStore } from './OperationHistoryListStore';
import { ActionModalsStore } from './ActionModalsStore';
import { StatisticsStore } from './StatisticsStore';
import { DictPersonsStore, DictAccountsStore } from './admin';

export type onAuthSuccessCb = (userInfo: UserInfo) => Promise<void>;

const createUserStore = (onAuthSuccess: onAuthSuccessCb): UserStoreEx => {
  const getUserInfo = () =>
    api
      .get(ENDPOINTS.userInfo())
      .then((userInfo: IUserInfo) => UserInfo.New(userInfo));

  const userStore = new UserStoreEx({
    userService: { login: api.login, logout: api.logout, getUserInfo },
    onAuthSuccess: (iUserInfo: IUserInfo) => {
      return new Promise(resolve => {
        resolve(UserInfo.New(iUserInfo));
      }).then(onAuthSuccess);
    },
  });

  userStore.init();

  return userStore;
};

export interface IStores {
  user?: UserStoreEx;
  routing?: RouterStore;
  processList?: ProcessListStore;
  activeProcess?: ActiveProcessStore;
  catalogs?: CatalogsStore;
  modals?: ModalsStore;
  actionModals?: ActionModalsStore;
  operationHistories?: OperationHistoryListStore;
  dictPersons?: DictPersonsStore;
  dictAccounts?: DictAccountsStore;
  statistics?: StatisticsStore;
}

let onAuthSuccess;
const user = createUserStore(onAuthSuccess);

const stores: IStores = {};

stores.user = user;
user.stores = stores;
onAuthSuccess = user.onAuthSuccess;

stores.routing = new RouterStore();
stores.processList = new ProcessListStore(stores);
stores.modals = new ModalsStore();
stores.activeProcess = new ActiveProcessStore();
stores.operationHistories = new OperationHistoryListStore();
stores.actionModals = new ActionModalsStore();
stores.catalogs = new CatalogsStore(stores);
stores.dictPersons = new DictPersonsStore(stores);
stores.dictAccounts = new DictAccountsStore(stores);
stores.statistics = new StatisticsStore(stores);

if (!process.env.production) {
  window.stores = stores;
}

const { StoresProvider, useStores } = createStoresContext<typeof stores>();
export { StoresProvider, useStores };

export default stores;
