import { statusFetching } from 'we-oauth2/lib/constants/types';
import { SignResponse, TRequestAction } from 'services';
import { ICall, IGuarantee, IClaim, IPaymentRequest, PROCESS_TYPE, IRequest, CompanyQualification, TPersonalCount, IRequestFormData, IRisk } from '../interfaces';
import { NormalizedError } from 'services/api/errorHandler';
export interface IObjWithLinks {
    guaranteeId?: string;
    callId?: string;
    claimId?: string;
    requestId?: string;
}
export declare class ActiveProcessStore {
    actionStatus: statusFetching;
    personalCountStatus: statusFetching;
    personalCountError: NormalizedError;
    isPending: boolean;
    callData: ICall;
    guaranteeData: IGuarantee;
    claimsData: IClaim[];
    paymentRequestData: IPaymentRequest[];
    requestData: IRequest & CompanyQualification & IRisk;
    personalCount: TPersonalCount;
    links: IObjWithLinks;
    lastProcessType: PROCESS_TYPE;
    saveLinks(obj: IObjWithLinks): void;
    get docName(): any;
    getDataByType(type: PROCESS_TYPE): ICall | IGuarantee | (IRequest & CompanyQualification & IRisk);
    actionCreator: <T>(actionFunc: () => Promise<T>) => Promise<T>;
    createCall(data: IRequestFormData): Promise<ICall>;
    getCall(id: string): Promise<ICall>;
    getGuarantee(id: string): Promise<IGuarantee>;
    reloadLastProcess(): Promise<any>;
    acceptCallSign(id: string, data: any): Promise<void>;
    rejectCall(id: string, params: {
        signature: string;
        reason: string;
    }): Promise<void>;
    acceptCall(id: string, params: {
        signature: string;
        term: number;
        rate: number;
    }): Promise<void>;
    acceptGuaranteeByPrincipal(id: string, params: {
        signature: string;
    }): Promise<void>;
    rejectGuaranteeByPrincipal(id: string, params: {
        signature: string;
        reason: string;
    }): Promise<void>;
    acceptGuaranteeByGuarantor(id: string, params: {
        signature: string;
    }): Promise<void>;
    createAmountReduceCall(id: string, params: {
        signature: string;
    }): Promise<any | SignResponse>;
    acceptAmountReduceCall(id: string, params: {
        signature: string;
    }): Promise<any | SignResponse>;
    rejectAmountReduceCall(id: string, params: {
        signature: string;
    }): Promise<any | SignResponse>;
    clarifyPaymentRequestFromPrincipal(id: string, params: {
        paymentRequestId: string;
    }): Promise<any | SignResponse>;
    acceptPaymentRequest(id: string, params: {
        signature: string;
    }): Promise<any | SignResponse>;
    rejectPaymentRequest(id: string, params: {
        signature: string;
        paymentRequestId: string;
    }): Promise<any | SignResponse>;
    acceptByPrincipalPaymentRequest(id: string, params: {
        signature: string;
    }): Promise<any | SignResponse>;
    rejectByPrincipalPaymentRequest(id: string, params: {
        signature: string;
    }): Promise<any | SignResponse>;
    startRequirementDelay(id: string, params: {
        signature: string;
    }): Promise<any | SignResponse>;
    endRequirementDelay(id: string, params: {
        paymentRequestId: string;
    }): Promise<any | SignResponse>;
    getClaims(loanId: string): Promise<IClaim[]>;
    getPaymentRequests(guaranteeId: string): Promise<IPaymentRequest[]>;
    createPaymentRequest(id: string, params: {
        signature: string;
    }): Promise<any | SignResponse>;
    getRequest(id: string, bank?: boolean): Promise<IRequest>;
    getPersonalCountRisk(id: string): void;
    requestAction(id: string, action: TRequestAction, params?: {
        reason: string;
    }): Promise<any | SignResponse>;
    clear(): void;
}
