import { ICall, IGuarantee, IClaim, ITransactionEvent, IPaymentRequest, CompanyQualification, TPersonalCount, ICompany } from '../interfaces';
import { Process } from '../models';
export declare type TTransactionResponse = {
    txId: string;
};
export declare type TRequestAction = 'process' | 'reject' | 'accept' | 'cancel' | 'rollback' | 'changeAmounts' | 'updateRegulatorStatus';
export declare namespace processService {
    function getCall(id: string): Promise<ICall>;
    function getProcessList(params: any): Promise<{
        content: Process[];
    }>;
    function acceptCall(id: string, params: {
        signature: string;
    }): Promise<TTransactionResponse>;
    function rejectCall(id: string, params: {
        signature: string;
        reason: string;
    }): Promise<TTransactionResponse>;
    function acceptCallSign(id: string, data: any): Promise<TTransactionResponse>;
    function getGuarantee(id: string): Promise<IGuarantee>;
    function acceptGuaranteeByPrincipal(id: string, data: any): Promise<TTransactionResponse>;
    function rejectGuaranteeByPrincipal(id: string, data: any): Promise<TTransactionResponse>;
    function acceptGuaranteeByGuarantor(id: string, data: any): Promise<TTransactionResponse>;
    function createAmountReduceCall(id: string, data: any): Promise<TTransactionResponse>;
    function acceptAmountReduceCall(id: string, data: any): Promise<TTransactionResponse>;
    function rejectAmountReduceCall(id: string, data: any): Promise<TTransactionResponse>;
    function createPaymentRequest(id: string, data: any): Promise<TTransactionResponse>;
    function clarifyPaymentRequestFromPrincipal(id: string, data: any): Promise<TTransactionResponse>;
    function acceptPaymentRequest(id: string, data: any): Promise<TTransactionResponse>;
    function rejectPaymentRequest(id: string, data: any): Promise<TTransactionResponse>;
    function acceptByPrincipalPaymentRequest(id: string, data: any): Promise<TTransactionResponse>;
    function rejectByPrincipalPaymentRequest(id: string, data: any): Promise<TTransactionResponse>;
    function getClaims(guaranteeId: string): Promise<Array<IClaim>>;
    function getPaymentRequests(guaranteeId: string): Promise<Array<IPaymentRequest>>;
    function getTransactionHistory(id: string): Promise<Array<ITransactionEvent>>;
    function getTransactionStatus(id: string): Promise<ITransactionEvent>;
    function startRequirementDelay(id: string, data: any): Promise<TTransactionResponse>;
    function endRequirementDelay(id: string, data: {
        paymentRequestId: string;
    }): Promise<TTransactionResponse>;
    function getRequest(id: string, bank?: boolean): Promise<any>;
    function getPersonalCountRisk(id: string): Promise<TPersonalCount>;
    function requestAction(id: string, action: TRequestAction, params?: {
        reason: string;
    }): Promise<TTransactionResponse>;
}
export declare function getCompanyByInnForBank(inn: string): Promise<ICompany & CompanyQualification>;
