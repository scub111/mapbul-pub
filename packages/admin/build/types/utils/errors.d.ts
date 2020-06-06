export declare const errorTypes: {
    SILENT: string;
};
export interface IDataError extends Error {
    data?: any;
}
export declare function createError(name: string, message: string, data?: any): IDataError;
export declare const silentError: IDataError;
export declare function isSilentError(error: IDataError): boolean;
export declare function handleSilentError(error: IDataError): Promise<void>;
export declare type HttpResponseError = Error & {
    response: {
        body: {
            error: string;
            text: string;
        };
    };
};
export declare function printError(error: any): string;
