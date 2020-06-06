import { api } from './api';
import { IUserInfo } from 'interfaces';
import { ENDPOINTS } from './endpoints';
import { UserInfo } from 'models';

export function listPersons(
  companyId: string
): Promise<Array<IUserInfo>> {
  return api.get(ENDPOINTS.persons(companyId));
}

export function createOrUpdatePerson(data: UserInfo): Promise<void> {
  return api.put(ENDPOINTS.person(data.personId), data);
}

export function deletePerson(data: UserInfo): Promise<void> {
  return api.del(ENDPOINTS.person(data.personId));
}