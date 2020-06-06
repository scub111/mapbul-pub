/// <reference types="styled-components" />
import * as React from 'react';
import { IStyledProps } from 'themes';
interface IHederProps {
    onClose: () => any;
    title: string;
    pending: boolean;
}
export declare const Header: React.ForwardRefExoticComponent<Pick<IHederProps & IStyledProps, "title" | "pending" | "onClose"> & {
    theme?: any;
}>;
export {};
