import * as React from 'react';
import { MobxForm } from '@we-ui-components/form';
import { IRate } from 'interfaces';
import { TActionModalProps } from 'components';
import { UserInfo } from 'models';
export declare class PrivateEditForm extends React.Component<TActionModalProps<IRate>> {
    formRef: MobxForm;
    data: Partial<UserInfo>;
    onValidate: () => Promise<{
        password: string;
        accountId: string;
        businessRoles: import("../../../../interfaces").TRole[];
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
    }>;
    render(): JSX.Element;
}
