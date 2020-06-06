/// <reference types="styled-components" />
import * as React from 'react';
import { IStyledProps } from 'themes';
export declare const CreateCall: React.ForwardRefExoticComponent<Pick<React.PropsWithChildren<IStyledProps & {
    onClose: () => void;
}>, "children" | "onClose"> & {
    theme?: any;
}>;
export declare const periodOptions: Array<{
    text: string;
    value: number;
}>;
