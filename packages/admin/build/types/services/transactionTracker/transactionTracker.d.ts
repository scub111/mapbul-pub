interface TrackingInfo {
    listeners: Array<() => void>;
    pollingPromise: Promise<any>;
    abort: () => void;
}
export declare function getTransactionsCount(): number;
export declare function clearAll(): void;
export declare function usePendingTransaction(): boolean;
export declare function track(transactionId: string, callback: () => void): Promise<unknown> | TrackingInfo;
export {};
