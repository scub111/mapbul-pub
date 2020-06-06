import * as React from 'react';
import { BoxProps } from 'grommet';
export declare const Collapse: ({ children, title, titleProps, prefix, collapsable, ...wrapperProps }: CollapseProps) => JSX.Element;
declare type CollapseProps = React.PropsWithChildren<BoxProps> & {
    prefix: React.ReactNode;
    title: React.ReactNode;
    titleProps: BoxProps & {
        color?: string;
    };
    collapsable?: boolean;
};
export {};
