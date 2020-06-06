import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
export declare const CompanyName: React.FC<{
    companyId: string;
}>;
export declare const CompanyIcon: React.FC<{
    companyId: string;
    isHidden?: boolean;
    size?: 'xsmall' | 'small' | 'medium';
    margin?: any;
}>;
export declare const ProcessesPage: React.FunctionComponent<RouteComponentProps<{}, import("react-router").StaticContext, {}>>;
