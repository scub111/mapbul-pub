import { BaseService } from './BaseService';
import { UserType } from 'models';
import { ENDPOINTS } from '.';
import { IUserTypeDTO } from '@mapbul-pub/types';

class UserTypesService extends BaseService<IUserTypeDTO, UserType> {
  constructor() {
    super(ENDPOINTS.userTypes, userType => UserType.New(userType));
  }
}

export const userTypesService = new UserTypesService();
