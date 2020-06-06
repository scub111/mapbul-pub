import { TProcessStatus, TProcessType, TGuaranteeStatus, TClaimStatus, TOfferStatus, TRequirementStatus, REQUEST_STATUS } from 'interfaces';
declare type TCommonStatus<T extends keyof any> = {
    texts: Record<T, string>;
    icons?: Record<T, any> | {
        ANYCASE: any;
    };
    colors?: Record<T, any> | {
        ANYCASE: any;
    };
};
export declare const PROCESS_LIST_COLORS: Record<TProcessStatus, string>;
export declare const OFFER_HISTORY_STATUSES: TCommonStatus<TOfferStatus>;
export declare const GUARANTEE_HISTORY_STATUSES: TCommonStatus<TGuaranteeStatus>;
export declare const CLAIM_HISTORY_STATUSES: TCommonStatus<TClaimStatus>;
export declare const REQUIREMENT_HISTORY_STATUSES: TCommonStatus<TRequirementStatus>;
export declare const REQUEST_HISTORY_STATUSES: TCommonStatus<REQUEST_STATUS>;
export declare const HISTORY_STATUSES: Record<TProcessType, TCommonStatus<TGuaranteeStatus & TOfferStatus & TClaimStatus & TRequirementStatus & REQUEST_STATUS>>;
export declare const PROCESS_TYPES: Record<TProcessType, string>;
export declare const PROCESS_STATUSES: Record<string, string>;
export {};
