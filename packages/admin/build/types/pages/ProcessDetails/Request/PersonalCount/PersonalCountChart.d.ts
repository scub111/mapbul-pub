import * as React from 'react';
import './PersonalCountChart.scss';
import { CSSProperties } from 'react';
export declare const LegendItem: React.FC<{
    text: string;
    value: string;
    color?: string;
    style?: CSSProperties;
}>;
export declare const ReferenceLabel: React.FC<{
    textShift1?: number;
    textShift2?: number;
    yOffset?: number;
    viewBox?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    dy?: number;
    dx?: number;
}>;
export declare const PersonalCountChart: React.FunctionComponent<{}>;
