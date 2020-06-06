import { IAccount } from 'interfaces';
export declare function listAccounts(companyId: string): Promise<Array<IAccount>>;
export declare function createOrUpdateAccount(data: IAccount): Promise<void>;
export declare function patchAccount(data: IAccount): Promise<void>;
export declare function deleteAccount(data: IAccount): Promise<void>;
