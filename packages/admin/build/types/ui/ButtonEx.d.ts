import * as React from 'react';
import { Button } from '@we-ui-components/base';
export declare const ButtonEx: ({ textRender, spinnerRender, isLoading, children, onClick, ...buttonProps }: ButtonExProps) => JSX.Element;
declare type ButtonExProps = React.ComponentProps<typeof Button> & {
    textRender?: React.ReactNode;
    spinnerRender?: React.ReactNode;
    children?: React.ReactNode;
};
export {};
