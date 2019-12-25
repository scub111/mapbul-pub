import { BaseService } from './BaseService';
import { Tenant } from 'models';
import { ENDPOINTS } from './endpoints';
import { ITenantDTO } from '@mapbul-pub/types';

class TenantsService extends BaseService<ITenantDTO, Tenant> {
  constructor() {
    super(ENDPOINTS.tenants, tenant => Tenant.New(tenant));
  }
}

export const tenantsService = new TenantsService();
