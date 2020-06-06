import * as React from 'react';
import { ActionModalConfig } from 'stores/ActionModalsStore';
export declare type TActionModalProps<T = any> = {
    config: ActionModalConfig;
    actionData: TActionDataType<T>;
    ref: any;
};
export declare type TActionDataType<T = any> = {
    isValid: boolean;
    data?: T;
};
export declare const ActionModal: React.FunctionComponent<{
    config: ActionModalConfig;
    visible: boolean;
}>;
export declare const ActionModals: React.FC;
