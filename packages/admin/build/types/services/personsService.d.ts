import { IUserInfo } from 'interfaces';
import { UserInfo } from 'models';
export declare function listPersons(companyId: string): Promise<Array<IUserInfo>>;
export declare function createOrUpdatePerson(data: UserInfo): Promise<void>;
export declare function deletePerson(data: UserInfo): Promise<void>;
