import { UserInfo } from 'models';
export declare const plural: (number: number, titles: string[]) => string;
export declare const getFullName: (fullName: {
    lastName: string;
    firstName: string;
    middleName: string;
}) => string;
export declare function mergeUserNames(data: UserInfo): UserInfo;
export declare function splitUserNames(data: UserInfo): UserInfo;
export declare function printDefined(value: string): string;
export declare function printSimple(value: string): string;
export declare function getTextLength(text: string, fontSize?: number, iterFn?: (ch: string, i: number, textLength: number) => boolean): number;
export declare function getTextLimitIndex(text: string, limit: number, fontSize?: number): number;
