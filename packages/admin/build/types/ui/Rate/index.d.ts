import * as React from 'react';
export declare enum RATE {
    AAA = "AAA",
    AA = "AA",
    A = "A",
    B = "B",
    C = "C",
    D = "D"
}
export interface IRateConfig {
    title: string;
    background: string;
    color: string;
    iconColor?: string;
}
export declare const REGULATOR_STATUS: Record<RATE, IRateConfig>;
export declare const Circle: ({ color, children, }: {
    color: string;
    children?: React.ReactNode;
}) => JSX.Element;
export declare const RateCircle: ({ status }: {
    status: RATE;
}) => JSX.Element;
export declare const RateLine: ({ status }: {
    status: RATE;
}) => JSX.Element;
