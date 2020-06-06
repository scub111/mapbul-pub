import * as React from 'react';
import { BoxProps } from 'grommet';
import { CompanyQualification } from 'interfaces';
interface QualificationReportProps extends BoxProps {
    params: CompanyQualification;
}
export declare const QualificationReport: React.ComponentType<QualificationReportProps>;
export declare const qualificationStatusColors: (status: QualificationStatus) => {
    background: string;
    text: string;
};
export declare type QualificationStatus = 'invalid' | 'passed' | 'failed';
export {};
