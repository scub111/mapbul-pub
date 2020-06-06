interface TrackingInfo {
    listeners: Array<() => void>;
    pollingPromise: Promise<any>;
    abort: () => void;
}
export declare function clearProcessTracker(): void;
export declare function trackProcess(transactionId: string, callback: () => void): Promise<unknown> | TrackingInfo;
export {};
