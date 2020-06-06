import { IUserInfo, TRole, IUserMeta, IAccount, TAccountRole } from 'interfaces';
export declare class UserInfo implements IUserInfo {
    static New(init: IUserInfo, accounts?: Array<IAccount>): UserInfo;
    accountId: string;
    businessRoles: Array<TRole>;
    companyId: string;
    companyName: string;
    displayName: string;
    email: string;
    firstName: string;
    lastName: string;
    nodeAlias: string;
    participantAddress: string;
    participantPublicKey: string;
    personId: string;
    phone: string;
    meta: IUserMeta | null;
    username: string;
    password: string;
    roles: Array<TAccountRole>;
    constructor(init: IUserInfo);
}
