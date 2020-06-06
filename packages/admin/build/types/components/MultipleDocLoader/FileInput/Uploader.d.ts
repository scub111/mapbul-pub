import * as React from 'react';
interface IFileUploaderProps extends React.InputHTMLAttributes<HTMLInputElement> {
    amount: number;
    description?: string;
    onClearClick(): void;
}
export declare const FileUploader: ({ amount, onClearClick, description, ...rest }: IFileUploaderProps) => JSX.Element;
export declare const FileWrap: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const InputContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
export {};
