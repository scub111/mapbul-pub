import * as React from 'react';
import { CSSProperties } from 'react';
interface IWidgetData {
    percent: number;
    color: string;
}
export declare const Widget: React.FC<{
    data: Array<IWidgetData>;
    style?: CSSProperties;
}>;
export declare const LegendItem: React.FC<{
    text: string;
    value: number;
    color?: string;
    style?: CSSProperties;
}>;
export declare const SpecialFNS: React.FunctionComponent<object>;
export {};
