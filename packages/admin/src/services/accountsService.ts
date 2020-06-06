import { api } from './api';
import { IAccount } from 'interfaces';
import { ENDPOINTS } from './endpoints';

export function listAccounts(companyId: string): Promise<Array<IAccount>> {
  return api.get(ENDPOINTS.accounts());
}

export function createOrUpdateAccount(data: IAccount): Promise<void> {
  return api.put(ENDPOINTS.account(data.accountId), data);
}

export function patchAccount(data: IAccount): Promise<void> {
  return api.patch(ENDPOINTS.account(data.accountId), data);
}

export function deleteAccount(data: IAccount): Promise<void> {
  return api.del(ENDPOINTS.account(data.accountId));
}
