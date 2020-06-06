export interface NormalizedError {
    code?: number | string;
    status?: number;
    message: string;
}
export declare function errorHandler<T>(error: any): T;
