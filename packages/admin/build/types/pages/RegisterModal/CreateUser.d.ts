import * as React from 'react';
import { MobxForm } from '@we-ui-components/form';
import { IAdminUser } from 'interfaces';
export declare function limitLength(value: string | number, limit?: number): string;
export declare class CreateUser extends React.Component<{
    initData?: IAdminUser;
}> {
    formRef: MobxForm;
    defaultData: Partial<IAdminUser> & {
        repeatPassword: string;
    };
    data: Partial<IAdminUser>;
    onValidate: () => Promise<any>;
    render(): JSX.Element;
}
