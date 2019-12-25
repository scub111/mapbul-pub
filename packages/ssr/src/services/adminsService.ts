import { BaseService } from './BaseService';
import { Admin } from 'models';
import { ENDPOINTS } from './endpoints';
import { IAdminDTO } from '@mapbul-pub/types';

class AdminsService extends BaseService<IAdminDTO, Admin> {
  constructor() {
    super(ENDPOINTS.admins, admin => Admin.New(admin));
  }
}

export const adminsService = new AdminsService();
