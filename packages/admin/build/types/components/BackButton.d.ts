import { BoxProps } from 'grommet';
import { CSSProperties } from 'react';
import { IStyledProps } from 'themes';
declare type BackButtonProps = {
    url?: string;
    border?: boolean;
    style?: CSSProperties;
} & BoxProps & IStyledProps;
export declare const BackButton: ({ style, url, border, ...props }: BackButtonProps) => JSX.Element;
export {};
