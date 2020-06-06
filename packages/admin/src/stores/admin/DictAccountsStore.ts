import {
  listAccounts,
  createOrUpdateAccount,
  deleteAccount,
  patchAccount,
} from 'services';
import { IStores } from 'stores';
import { IAccount } from 'interfaces';
import { ListStoreConstructor } from '../core/ListStoreConstructor';
// import { UserInfo } from '../../models';

export class DictAccountsStore extends ListStoreConstructor<IAccount> {
  constructor(stores: IStores) {
    super(stores, () => {
      return listAccounts(this.stores.user.userInfo.companyId).then((data: any) => {
        return {
          content: data,
        };
      });
    }, { isLocal: true });
  }

  public editData(paramObj?: any) {
    return createOrUpdateAccount(paramObj);
  }

  public removeData(paramObj?: any) {
    return deleteAccount(paramObj);
  }

  public patchData(paramObj?: any) {
    return patchAccount(paramObj);
  }
}
