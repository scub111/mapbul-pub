import { IStores } from 'stores';
import { IAccount } from 'interfaces';
import { ListStoreConstructor } from '../core/ListStoreConstructor';
export declare class DictAccountsStore extends ListStoreConstructor<IAccount> {
    constructor(stores: IStores);
    editData(paramObj?: any): Promise<void>;
    removeData(paramObj?: any): Promise<void>;
    patchData(paramObj?: any): Promise<void>;
}
