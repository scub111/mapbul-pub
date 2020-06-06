import * as React from 'react';
import { statusFetching } from 'we-oauth2/lib/constants/types';
export declare type ActionModalBody = (data: {
    actionData?: any;
}) => React.ComponentElement<{
    onClose?: () => any;
    actionData?: any;
}, any>;
export interface ActionModalOptions {
    width?: string;
    position?: 'flex-start' | 'center';
    title: string;
    onApply: (data?: any) => Promise<any>;
    onClose?: (data?: any) => any;
    applyText: string;
    closeText?: string;
    noValidation?: boolean;
    initData?: any;
    showOther?: boolean;
}
export interface ActionModalConfig {
    id: string;
    render: ActionModalBody | any;
    options: ActionModalOptions;
    error?: string;
    actionStatus?: statusFetching;
}
export declare class ActionModalsStore {
    pool: Array<ActionModalConfig>;
    open: (render: any, options?: ActionModalOptions) => Promise<any>;
    close: (id: string) => void;
    closeLastModal: () => void;
    rejectError: (id: string, err: any, reject?: any) => Promise<never>;
}
