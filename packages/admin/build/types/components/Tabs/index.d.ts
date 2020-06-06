import * as React from 'react';
import { BoxProps } from 'grommet/es6';
import { TRole } from 'interfaces';
export declare const Tabs: React.FC<IProps & BoxProps>;
export declare namespace Tabs {
    type TTabsProps = IProps;
    type TTabProps = ITabOptions;
}
export interface ITabProps extends ITabOptions, React.ComponentProps<any> {
    selected?: string;
    onChange?: (id: string) => void;
    small?: boolean;
}
export interface ITabOptions {
    text: string | React.ReactNode;
    id?: string;
    disabled?: boolean;
    roles?: TRole[];
    children?: Array<ITabOptions>;
}
interface IProps {
    selected?: string;
    onChange?: (id: string) => void;
    tabs: Array<ITabOptions>;
    small?: boolean;
}
export {};
