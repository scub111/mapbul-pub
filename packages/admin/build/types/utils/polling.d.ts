interface Options {
    asyncFn: () => Promise<any>;
    interval?: number;
    shouldStop: (response: any) => boolean;
    shouldKeepOnError?: (error: any) => boolean;
    signal?: any;
}
export declare function createAsyncPolling({ asyncFn, interval, shouldStop, shouldKeepOnError, signal, }: Options): Promise<unknown>;
export {};
