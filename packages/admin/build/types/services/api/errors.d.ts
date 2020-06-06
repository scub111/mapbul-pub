export declare const fallbackError: {
    code: string;
    message: string;
};
export declare const statusMessages: {
    400: string;
    401: string;
    403: string;
    404: string;
    500: string;
    default: string;
};
export declare function getStatusMessage(status: number): any;
