import * as React from 'react';
export declare const PrettifyFileInput: (props: any) => JSX.Element;
export interface IMultipleDocLoaderProps {
    name: string;
    title?: string;
    documents: string[];
    data: any;
}
export declare const MultipleDocLoader: React.FC<IMultipleDocLoaderProps>;
