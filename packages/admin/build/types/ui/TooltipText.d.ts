import * as React from 'react';
import { TTextSize } from 'interfaces';
import { CSSProperties } from 'react';
export declare const TooltipText: React.FC<{
    text: string;
    limit?: number;
    size?: TTextSize;
    style?: CSSProperties;
}>;
