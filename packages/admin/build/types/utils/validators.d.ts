/// <reference types="react" />
/// <reference types="@emotion/core" />
export declare function createValidate(func: (value: any, data?: any) => boolean, error: any): {
    validator(rule: any[], value: any, callback: (errors: any[]) => void, storeData?: any): void;
};
interface ValidatorFunc<T = string> {
    (rule: any[], value: T, callback: (errors: any[]) => void): void;
}
export declare const maxLength: (length: number, msg?: string) => ValidatorFunc<string>;
export declare const isTheSameAs: (fieldName: string, err: string) => {
    validateType: string;
    validator(rule: any[], value: any, callback: (errors: any[]) => void, storeData?: any): void;
};
export declare const nonEmptyFilesRule: (_: any, value: File[], cb: (errors: any[]) => void) => void;
export declare const isLengthBetween: (minLength: number, maxLength: number) => {
    validator(rule: any[], value: string, callback: (errors: any[]) => void, storeData?: any): void;
    validateType: string;
};
export declare const limitLength: (value: import("react").ReactText, limit?: number) => string;
export declare const isPositive: {
    validator(rule: any[], value: any, callback: (errors: any[]) => void, storeData?: any): void;
};
export declare const oneOfLengths: (lengths: number[], message?: string) => {
    validator(rule: any[], value: any, callback: (errors: any[]) => void, storeData?: any): void;
};
export declare const hasWords: (count: number, message: string) => {
    validator(rule: any[], value: any, callback: (errors: any[]) => void, storeData?: any): void;
};
export declare const moreThanZero: {
    validator(rule: any[], value: any, callback: (errors: any[]) => void, storeData?: any): void;
    validateType: string;
};
export {};
