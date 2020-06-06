import { ListStoreConstructor } from '../core/ListStoreConstructor';
import { IStores } from 'stores';
import { UserInfo } from 'models';
export declare class DictPersonsStore extends ListStoreConstructor<UserInfo> {
    constructor(stores: IStores);
    editData(paramObj?: UserInfo): Promise<void>;
    removeData(paramObj?: UserInfo): Promise<void>;
}
