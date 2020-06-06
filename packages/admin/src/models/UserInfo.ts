import { IUserInfo, TRole, IUserMeta, IAccount, TAccountRole } from 'interfaces';

export class UserInfo implements IUserInfo {
  public static New(init: IUserInfo, accounts?: Array<IAccount>) {
    const userInfo = new UserInfo(init);

    if (accounts) {
      const account = accounts.find(item => item.accountId === init.accountId);
      if (account) {
        userInfo.username = account.username;
      }
    }

    return userInfo;
  }

  public accountId: string;
  public businessRoles: Array<TRole>;
  public companyId: string;
  public companyName: string;
  public displayName: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public nodeAlias: string;
  public participantAddress: string;
  public participantPublicKey: string;
  public personId: string;
  public phone: string;
  public meta: IUserMeta | null;

  public username: string;
  public password: string;
  public roles: Array<TAccountRole>

  public constructor(init: IUserInfo) {
    // Object.assign(this, init);
    this.accountId = init.accountId;
    this.businessRoles = init.businessRoles;
    this.companyId = init.companyId;
    this.displayName = init.displayName;
    this.email = init.email;
    this.firstName = init.firstName;
    this.lastName = init.lastName;
    this.nodeAlias = init.nodeAlias;
    this.participantAddress = init.participantAddress;
    this.participantPublicKey = init.participantPublicKey;
    this.personId = init.personId;
    this.phone = init.phone;
    this.meta = init.meta;
  }
}
