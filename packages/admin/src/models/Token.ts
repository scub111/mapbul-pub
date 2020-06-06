import { ITokenEx } from 'interfaces';
import { UserInfo } from 'models';

export class TokenEx implements ITokenEx {
  public static async New(init: ITokenEx) {
    const personInfo = await UserInfo.New(init.personInfo);
    return new TokenEx(init, personInfo);
  }

  public access_token: string;
  public token_type: string;
  public refresh_token: string;
  public expires_in: number;
  public scope: string;
  public jti: string;
  public accountId: string;
  public personInfo: UserInfo;

  public constructor(init: ITokenEx, personInfo: UserInfo) {
    this.access_token = init.access_token;
    this.token_type = init.token_type;
    this.refresh_token = init.refresh_token;
    this.expires_in = init.expires_in;
    this.scope = init.scope;
    this.jti = init.jti;
    this.accountId = init.accountId;
    this.personInfo = personInfo;
  }
}
