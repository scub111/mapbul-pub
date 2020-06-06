export declare type TID = string | number;
export declare type TOrList<T> = T | Array<T>;
export declare type TWithout<T, Key extends keyof T> = {
    [K in Exclude<keyof T, Key>]: T[K];
};
export declare type TNullAllProperty<T> = {
    [K in keyof T]: null;
};
export declare type TNullableField<T, Key extends keyof T> = {
    [K in keyof T]: K extends Key ? T[K] | null : T[K];
};
export declare type TError = {
    status: number;
    message: string;
};
export declare type TErrorObject = {
    error: TError;
};
export declare type TLoading = {
    loading: boolean;
};
export declare type TCb<T = any, R = void> = (param: T) => R;
export declare type TFunc<T extends Array<any>, R> = (...args: T) => R;
