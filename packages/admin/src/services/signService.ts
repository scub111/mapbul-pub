import { api } from './api';
import { ENDPOINTS } from './endpoints';
import { SignResponse } from './callsService';

export type TTemplateParams = {
  filename: string;
  type: 'DOCX' | 'PDF';
  responseType: 'STREAM' | 'BASE64';
  rate: number;
  term: number;
};

export namespace signService {
  export function acceptProposalSign(
    id: string,
    params: { term: number; rate: number },
  ): Promise<SignResponse> {
    return api.post<SignResponse>(ENDPOINTS.acceptProposalSign(id), params);
  }

  export function rejectProposalSign(
    id: string,
    params: { reason: string },
  ): Promise<SignResponse> {
    return api.post<SignResponse>(ENDPOINTS.rejectProposalSign(id), params);
  }

  export function rejectCallSign(
    id: string,
    params: { reason: string },
  ): Promise<SignResponse> {
    return api.post(ENDPOINTS.rejectCallSign(id), params);
  }

  export function acceptCallSign(id: string, data: any): Promise<SignResponse> {
    return api.post(ENDPOINTS.acceptCallSign(id), data);
  }

  export function acceptGuaranteeByPrincipalSign(
    id: string,
    data: any,
  ): Promise<SignResponse> {
    return api.post(ENDPOINTS.acceptGuaranteeByPrincipalSign(id), data);
  }

  export function rejectGuaranteeByPrincipalSign(
    id: string,
    data: any,
  ): Promise<SignResponse> {
    return api.post(ENDPOINTS.rejectGuaranteeByPrincipalSign(id), data);
  }

  export function acceptGuaranteeByGuarantorSign(
    id: string,
    data: any,
  ): Promise<SignResponse> {
    return api.post(ENDPOINTS.acceptGuaranteeByGuarantorSign(id), data);
  }

  export function createAmountReduceCallSign(
    id: string,
    data: any,
  ): Promise<SignResponse> {
    return api.post(ENDPOINTS.createAmountReduceCallSign(id), data);
  }

  export function acceptAmountReduceCallSign(
    guaranteeId: string,
    data: any,
  ): Promise<SignResponse> {
    const { claimId } = data;
    return api.post(
      ENDPOINTS.acceptAmountReduceCallSign(guaranteeId, claimId),
      { signature: 'signature' },
    );
  }

  export function rejectAmountReduceCallSign(
    guaranteeId: string,
    data: any,
  ): Promise<SignResponse> {
    const { claimId, reason } = data;
    return api.post(
      ENDPOINTS.rejectAmountReduceCallSign(guaranteeId, claimId),
      { signature: 'signature', reason },
    );
  }

  export function createPaymentRequestSign(
    id: string,
    data: any,
  ): Promise<SignResponse> {
    return api.post(ENDPOINTS.createPaymentRequestSign(id), data);
  }

  export function acceptPaymentRequestSign(
    guaranteeId: string,
    data: any,
  ): Promise<SignResponse> {
    const { paymentRequestId } = data;
    return api.post(
      ENDPOINTS.acceptPaymentRequestSign(guaranteeId, paymentRequestId),
      { signature: 'signature' },
    );
  }

  export function rejectPaymentRequestSign(
    guaranteeId: string,
    data: any,
  ): Promise<SignResponse> {
    const { paymentRequestId, rejectionReason } = data;
    return api.post(
      ENDPOINTS.rejectPaymentRequestSign(guaranteeId, paymentRequestId),
      { signature: 'signature', rejectionReason },
    );
  }

  export function acceptByPrincipalPaymentRequestSign(
    guaranteeId: string,
    data: any,
  ): Promise<SignResponse> {
    const { paymentRequestId } = data;
    return api.post(
      ENDPOINTS.acceptByPrincipalPaymentRequestSign(
        guaranteeId,
        paymentRequestId,
      ),
      { signature: 'signature' },
    );
  }

  export function rejectByPrincipalPaymentRequestSign(
    guaranteeId: string,
    data: any,
  ): Promise<SignResponse> {
    const { paymentRequestId, rejectionReason } = data;
    return api.post(
      ENDPOINTS.rejectByPrincipalPaymentRequestSign(
        guaranteeId,
        paymentRequestId,
      ),
      { signature: 'signature', rejectionReason },
    );
  }

  export function startRequirementDelaySign(
    guaranteeId: string,
    data: any,
  ): Promise<SignResponse> {
    const { paymentRequestId, ...params } = data;

    return api.post(
      ENDPOINTS.startRequirementDelaySign(guaranteeId, paymentRequestId),
      params,
    );
  }

  export function getOfferTemplate(
    proposalId: string,
    params: TTemplateParams,
  ): Promise<any> {
    return api.get(ENDPOINTS.offerTemplate(proposalId), params);
  }

  export function getOfferFile(
    offerId: string,
    params: { filename: string },
  ): Promise<SignResponse> {
    return api.get(ENDPOINTS.offerFile(offerId), params);
  }
}
