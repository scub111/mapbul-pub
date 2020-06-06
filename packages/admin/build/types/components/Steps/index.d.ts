import * as React from 'react';
import { BoxProps } from 'grommet';
export declare const Steps: React.FC<IProps>;
interface IProps extends BoxProps {
    options: Array<IStepOption>;
    selected: string | number;
    onSelectStep?: (id: string | number) => void;
    className?: string;
}
export interface IStepOption {
    id: string | number;
    text?: string | React.ReactNode;
    className?: string;
    disabled?: boolean;
    textRender?: (isActive: boolean) => string | React.ReactNode;
}
export {};
