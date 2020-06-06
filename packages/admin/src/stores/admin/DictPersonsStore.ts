// import * as bcrypt from 'bcryptjs';
import { ListStoreConstructor } from '../core/ListStoreConstructor';
import { listPersons, createOrUpdatePerson, deletePerson } from 'services';
import { IStores } from 'stores';
import { UserInfo } from 'models';

export class DictPersonsStore extends ListStoreConstructor<UserInfo> {
  constructor(stores: IStores) {
    super(
      stores,
      //@ts-ignore
      async() => {
        await stores.dictAccounts.fetch();
        return listPersons(this.stores.user.userInfo.companyId).then(data => {
          return {
            content: data.map(item => UserInfo.New(item, stores.dictAccounts.allData)),
          };
        });
      },
      { isLocal: true }, // TODO remove polling
    );
  }

  public editData(paramObj?: UserInfo) {
    return createOrUpdatePerson(paramObj);
  }

  public removeData(paramObj?: UserInfo) {
    return deletePerson(paramObj);
  }
}
