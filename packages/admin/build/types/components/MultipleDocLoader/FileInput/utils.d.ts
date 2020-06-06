export declare const getFilesBase64: (files: File[], cb: (filesWithBase64: IFileWithBase64[]) => void) => void;
export declare const getFilesBase64Promise: (files: File[]) => Promise<IFileWithBase64[]>;
export declare const getFileBase64: (file: File, cb: (base64: string) => void) => void;
export declare const useDerivedState: <T = unknown>(defaultValue: T, paramsToSync?: Partial<IParamsToSync<T>>) => [T, (value: T) => void];
export declare const getFilesWithHashes: (files: File[]) => {
    file: File;
    hash: string;
}[];
interface IParamsToSync<T> {
    value: T;
    setValue(value: T): void;
}
interface IFileWithBase64 {
    file: File;
    base64: string;
}
export {};
