import { SignResponse } from './callsService';
export declare type TTemplateParams = {
    filename: string;
    type: 'DOCX' | 'PDF';
    responseType: 'STREAM' | 'BASE64';
    rate: number;
    term: number;
};
export declare namespace signService {
    function acceptProposalSign(id: string, params: {
        term: number;
        rate: number;
    }): Promise<SignResponse>;
    function rejectProposalSign(id: string, params: {
        reason: string;
    }): Promise<SignResponse>;
    function rejectCallSign(id: string, params: {
        reason: string;
    }): Promise<SignResponse>;
    function acceptCallSign(id: string, data: any): Promise<SignResponse>;
    function acceptGuaranteeByPrincipalSign(id: string, data: any): Promise<SignResponse>;
    function rejectGuaranteeByPrincipalSign(id: string, data: any): Promise<SignResponse>;
    function acceptGuaranteeByGuarantorSign(id: string, data: any): Promise<SignResponse>;
    function createAmountReduceCallSign(id: string, data: any): Promise<SignResponse>;
    function acceptAmountReduceCallSign(guaranteeId: string, data: any): Promise<SignResponse>;
    function rejectAmountReduceCallSign(guaranteeId: string, data: any): Promise<SignResponse>;
    function createPaymentRequestSign(id: string, data: any): Promise<SignResponse>;
    function acceptPaymentRequestSign(guaranteeId: string, data: any): Promise<SignResponse>;
    function rejectPaymentRequestSign(guaranteeId: string, data: any): Promise<SignResponse>;
    function acceptByPrincipalPaymentRequestSign(guaranteeId: string, data: any): Promise<SignResponse>;
    function rejectByPrincipalPaymentRequestSign(guaranteeId: string, data: any): Promise<SignResponse>;
    function startRequirementDelaySign(guaranteeId: string, data: any): Promise<SignResponse>;
    function getOfferTemplate(proposalId: string, params: TTemplateParams): Promise<any>;
    function getOfferFile(offerId: string, params: {
        filename: string;
    }): Promise<SignResponse>;
}
