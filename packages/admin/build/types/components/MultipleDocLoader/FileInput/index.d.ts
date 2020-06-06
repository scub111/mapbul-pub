import * as React from 'react';
interface IFileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    value?: File[];
    description?: string;
    onChange?(files: File[]): void;
}
export declare const FileInput: (props: IFileInputProps) => JSX.Element;
export { getFileBase64, getFilesBase64, getFilesBase64Promise } from './utils';
