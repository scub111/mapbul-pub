import * as React from 'react';
import { IRequest, CompanyQualification, IRisk } from 'interfaces';
export declare const DataContainer: React.FunctionComponent<{
    data: IRequest & CompanyQualification & IRisk;
    showCount: boolean;
    children: React.ReactNode;
}>;
