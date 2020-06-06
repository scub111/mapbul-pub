import * as React from 'react';
import { DictionaryContainer, DictionaryContent } from '../components';
import { useStores } from 'stores';
import { columns } from './columns';
import { CreateEditForm, RemoveForm, PrivateEditForm } from './components';
import { BankInfo } from 'components';
import { splitUserNames, mergeUserNames } from 'utils';
import { UserInfo } from 'models';
import { useCallback } from 'react';

export type UserInfoEx = UserInfo & {
  isCreate?: boolean;
  isAdministrator?: boolean;
};

export const DictPersonsPage: React.FC = () => {
  const { user, dictAccounts, dictPersons, actionModals } = useStores();

  const onCreateClickHandler = useCallback(() => {
    actionModals.open(CreateEditForm, {
      title: 'Добавление нового пользователя',
      applyText: 'Подтвердить',
      closeText: 'Отменить',
      noValidation: true,
      onApply: async (user: UserInfo) => {
        const splitUser = splitUserNames(user);
        await dictAccounts.editData(splitUser);
        await dictPersons.editData(splitUser);
        dictPersons.fetch();
      },
      width: '850px',
    });
  }, []);

  const onPrivateEditClickHandler = useCallback((initData: UserInfo) => {
    actionModals.open(PrivateEditForm, {
      initData: mergeUserNames(initData),
      title: `Изменение логина и пароля`,
      applyText: 'Подтвердить',
      closeText: 'Отменить',
      noValidation: true,
      onApply: async (user: UserInfo) => {
        await dictAccounts.patchData(user);
        dictPersons.fetch();
      },
      width: '440px',
    });
  }, []);

  const onEditClickHandler = useCallback((initData: UserInfo) => {
    actionModals.open(CreateEditForm, {
      initData: {
        ...mergeUserNames(initData),
        isCreate: false,
        isAdministrator: initData.personId === user.userInfo.personId,
      } as UserInfoEx,
      title: `Изменение пользователя`,
      applyText: 'Подтвердить',
      closeText: 'Отменить',
      noValidation: true,
      onApply: async (user: UserInfo) => {
        if (user.businessRoles.some(role => role === 'ADMINISTRATOR')) {
          await dictAccounts.patchData(user);
        }
        await dictPersons.editData(splitUserNames(user));
        dictPersons.fetch();
      },
      width: '850px',
    });
  }, []);

  const onRemoveClickHandler = useCallback((initData: UserInfo) => {
    actionModals.open(RemoveForm, {
      initData: initData,
      title: `Удаление пользователя`,
      applyText: 'Удалить',
      closeText: 'Отменить',
      noValidation: true,
      onApply: async (user: UserInfo) => {
        await dictPersons.removeData(user);
        await dictAccounts.removeData(user);
        dictPersons.fetch();
      },
      width: '850px',
    });
  }, []);

  return (
    <DictionaryContainer>
      <DictionaryContent
        caption={<BankInfo />}
        columns={columns}
        store={dictPersons}
        allowCreate={() => true}
        allowPrivateEdit={() => true}
        allowEdit={() => true}
        allowDelete={() => true}
        disableDelete={data => data.personId === user.userInfo.personId}
        onPrivateEditClick={onPrivateEditClickHandler}
        onEditClick={onEditClickHandler}
        onCreateClick={onCreateClickHandler}
        onRemoveClick={onRemoveClickHandler}
      />
    </DictionaryContainer>
  );
};
