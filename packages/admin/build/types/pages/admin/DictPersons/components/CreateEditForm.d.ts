import * as React from 'react';
import { MobxForm } from '@we-ui-components/form';
import { IRate, IBusinessRole, TRole } from 'interfaces';
import { TActionModalProps } from 'components';
import { IStores } from 'stores';
import { UserInfoEx } from '..';
export declare class CreateEditForm extends React.Component<TActionModalProps<IRate> & Pick<IStores, 'catalogs' | 'user'>> {
    formRef: MobxForm;
    creatorType: TRole;
    defaultData: Partial<UserInfoEx>;
    get roles(): IBusinessRole[];
    data: Partial<UserInfoEx>;
    onValidate: () => Promise<{
        password: string;
        accountId: string;
        businessRoles: TRole[];
        companyId: string;
        companyName: string;
        displayName: string;
        email: string;
        firstName: string;
        lastName: string;
        nodeAlias: string;
        participantAddress: string;
        participantPublicKey: string;
        personId: string;
        phone: string;
        meta: import("../../../../interfaces").IUserMeta;
        username: string;
        roles: import("../../../../interfaces").TAccountRole[];
        isCreate?: boolean;
        isAdministrator?: boolean;
    }>;
    onRoleSelect: (role: IBusinessRole, value: boolean) => void;
    render(): JSX.Element;
}
