import * as React from 'react';
import { MobxForm } from '@we-ui-components/form';
import { ICompany, CallerType } from 'interfaces';
export declare class CreateOrganization extends React.Component<{
    initData?: Partial<ICompany>;
    organizationType: CallerType;
}> {
    formRef: MobxForm;
    defaultData: Partial<ICompany>;
    data: Partial<ICompany>;
    onValidate: () => Promise<any>;
    render(): JSX.Element;
}
