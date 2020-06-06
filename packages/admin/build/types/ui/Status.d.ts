import * as React from 'react';
import { BoxTypes } from 'grommet';
import { TTextSize, IProcess, TRequestStatus, TRequestFnsStatus } from 'interfaces';
export declare const REQUEST_TABLE_STATUSES: TCommonStatus<TRequestStatus>;
export declare const REQUEST_FNS_TABLE_STATUSES: TCommonStatus<TRequestFnsStatus>;
export declare const getStatusTextMap: (isRegulator: boolean) => Record<TRequestFnsStatus, string> | Record<TRequestStatus, string>;
export declare const REQUEST_STATUSES: Record<TRequestStatus, string>;
export declare type TCommonStatus<T extends keyof any> = {
    texts: Record<T, string>;
    textColors?: Record<T, string> | {
        ANYCASE: string;
    };
    boxStyle?: Record<T, React.CSSProperties> | {
        ANYCASE: React.CSSProperties;
    };
};
export declare const RequestTableStatus: React.FC<{
    data: IProcess;
    size?: TTextSize;
} & BoxTypes>;
export declare const RequestTableFnsStatus: React.FC<{
    data: IProcess;
    size?: TTextSize;
} & BoxTypes>;
