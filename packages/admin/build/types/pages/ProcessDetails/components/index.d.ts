/// <reference types="styled-components" />
import * as React from 'react';
import { TDataItemProps } from '@we-ui-components/base';
import { PROCESS_TYPE, TProcessType } from 'interfaces';
import { IStyledProps } from 'themes';
export declare type TAB_ID = PROCESS_TYPE | 'COUNT';
interface IHederProps {
    onClose: () => any;
    title: string;
    status: any;
    type: TProcessType;
    pending: boolean;
    children: React.ReactNode;
}
export declare const Header: React.ForwardRefExoticComponent<Pick<IHederProps & IStyledProps, "title" | "children" | "type" | "status" | "pending" | "onClose"> & {
    theme?: any;
}>;
interface ITabsProps {
    selected: string;
    onChange: (id: any) => void;
    tabs: Array<{
        id: string;
        text: string;
    }>;
}
export declare const TabsPanel: ({ selected, onChange, tabs }: ITabsProps) => JSX.Element;
export declare const Loader: () => JSX.Element;
export declare const Body: (props: {
    children: React.ReactNode;
    style?: object;
}) => JSX.Element;
export declare const Bullet: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const FilesItem: React.FC<TDataItemProps>;
export {};
