import { ITokenEx } from 'interfaces';
import { UserInfo } from 'models';
export declare class TokenEx implements ITokenEx {
    static New(init: ITokenEx): Promise<TokenEx>;
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    jti: string;
    accountId: string;
    personInfo: UserInfo;
    constructor(init: ITokenEx, personInfo: UserInfo);
}
