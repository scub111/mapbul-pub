import { GlobalVar } from '../config';
import { BaseService } from './BaseService';
import { User } from 'models';
import {
  editorsService,
  journalistsService,
  guidesService,
  tenantsService,
  userTypesService,
} from '.';
import { UserDescription } from 'interfaces';

export const analizeUserTag = async (
  service: BaseService<any, any>,
  user: User,
  caption: string,
): Promise<string> => {
  const journalists = await service.list({ page: 1, size: 1, filter: `userId=${user.id}` });
  if (journalists.content.length > 0) {
    const journalist = journalists.content[0];
    return `${caption} ${journalist.lastName} ${journalist.firstName}`;
  }
  return '';
};

export const takeUserDescription = async (user: User, userTag: string): Promise<string> => {
  if (userTag === 'admin') {
    return GlobalVar.isRus ? 'Администратор' : 'Admin';
  } else if (userTag === 'edit') {
    return await analizeUserTag(editorsService, user, GlobalVar.isRus ? 'Редактор:' : 'Editor:');
  } else if (userTag === 'journ') {
    return await analizeUserTag(
      journalistsService,
      user,
      GlobalVar.isRus ? 'Журналист:' : 'Journalist',
    );
  } else if (userTag === 'guide') {
    return await analizeUserTag(guidesService, user, GlobalVar.isRus ? 'Гид:' : 'Guide');
  } else if (userTag === 'tenant') {
    return await analizeUserTag(tenantsService, user, GlobalVar.isRus ? 'Житель:' : 'Tenant');
  }
  return '';
};

export const getUserDescription = async (user: User): Promise<UserDescription> => {
  const userType = await userTypesService.get(user.userTypeId);
  return {
    type: userType.tag,
    description: await takeUserDescription(user, userType.tag),
  };
};
