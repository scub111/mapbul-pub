import * as React from 'react';
import { BoxProps } from 'grommet';
import { QualificationStatus } from '.';
export declare const QualificationStatusIcon: ({ status, ...wrapperProps }: BoxProps & {
    status: QualificationStatus;
    height?: React.ReactText;
    width?: React.ReactText;
} & {
    style?: React.CSSProperties;
}) => JSX.Element;
