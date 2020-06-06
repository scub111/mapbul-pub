import { api } from './api';
import { ENDPOINTS } from './endpoints';
import {
  ICall,
  IGuarantee,
  IClaim,
  ITransactionEvent,
  IPaymentRequest,
  IRequest,
  CompanyQualification,
  TPersonalCount,
  ICompany,
} from '../interfaces';
import { Process } from '../models';

export type TTransactionResponse = { txId: string };

export type TRequestAction =
  | 'process'
  | 'reject'
  | 'accept'
  | 'cancel'
  | 'rollback'
  | 'changeAmounts'
  | 'updateRegulatorStatus';

export namespace processService {
  export function getCall(id: string): Promise<ICall> {
    return api.get(ENDPOINTS.call(id));
  }

  export function getProcessList(params: any): Promise<{ content: Process[] }> {
    return api.get(ENDPOINTS.processes(), params);
  }

  export function acceptCall(
    id: string,
    params: { signature: string },
  ): Promise<TTransactionResponse> {
    return api.post(ENDPOINTS.acceptCall(id), params);
  }

  export function rejectCall(
    id: string,
    params: { signature: string; reason: string },
  ): Promise<TTransactionResponse> {
    return api.post(ENDPOINTS.rejectCall(id), params);
  }

  export function acceptCallSign(
    id: string,
    data: any,
  ): Promise<TTransactionResponse> {
    return api.post(ENDPOINTS.acceptCallSign(id), data);
  }

  export function getGuarantee(id: string): Promise<IGuarantee> {
    return api.get(ENDPOINTS.guarantee(id));
  }

  export function acceptGuaranteeByPrincipal(
    id: string,
    data: any,
  ): Promise<TTransactionResponse> {
    return api.post(ENDPOINTS.acceptGuaranteeByPrincipal(id), data);
  }

  export function rejectGuaranteeByPrincipal(
    id: string,
    data: any,
  ): Promise<TTransactionResponse> {
    return api.post(ENDPOINTS.rejectGuaranteeByPrincipal(id), data);
  }

  export function acceptGuaranteeByGuarantor(
    id: string,
    data: any,
  ): Promise<TTransactionResponse> {
    return api.post(ENDPOINTS.acceptGuaranteeByGuarantor(id), {
      signature: data.signature,
      documentSignature: data.documentSignature,
    });
  }

  export function createAmountReduceCall(
    id: string,
    data: any,
  ): Promise<TTransactionResponse> {
    return api.post(ENDPOINTS.createAmountReduceCall(id), data);
  }

  export function acceptAmountReduceCall(
    id: string,
    data: any,
  ): Promise<TTransactionResponse> {
    const { claimId, ...rest } = data;
    return api.post(ENDPOINTS.approveAmountReduceCall(id, claimId), rest);
  }

  export function rejectAmountReduceCall(
    id: string,
    data: any,
  ): Promise<TTransactionResponse> {
    const { claimId, ...rest } = data;
    return api.post(ENDPOINTS.rejectAmountReduceCall(id, claimId), rest);
  }

  export function createPaymentRequest(
    id: string,
    data: any,
  ): Promise<TTransactionResponse> {
    return api.post(ENDPOINTS.createPaymentRequest(id), data);
  }

  export function clarifyPaymentRequestFromPrincipal(
    id: string,
    data: any,
  ): Promise<TTransactionResponse> {
    const { paymentRequestId, ...rest } = data;
    return api.post(
      ENDPOINTS.clarifyPaymentRequestFromPrincipal(id, paymentRequestId),
      rest,
    );
  }

  export function acceptPaymentRequest(
    id: string,
    data: any,
  ): Promise<TTransactionResponse> {
    const { paymentRequestId, ...rest } = data;
    return api.post(ENDPOINTS.acceptPaymentRequest(id, paymentRequestId), rest);
  }

  export function rejectPaymentRequest(
    id: string,
    data: any,
  ): Promise<TTransactionResponse> {
    const { paymentRequestId, ...rest } = data;
    return api.post(ENDPOINTS.rejectPaymentRequest(id, paymentRequestId), rest);
  }

  export function acceptByPrincipalPaymentRequest(
    id: string,
    data: any,
  ): Promise<TTransactionResponse> {
    const { paymentRequestId, ...rest } = data;
    return api.post(
      ENDPOINTS.acceptByPrincipalPaymentRequest(id, paymentRequestId),
      rest,
    );
  }

  export function rejectByPrincipalPaymentRequest(
    id: string,
    data: any,
  ): Promise<TTransactionResponse> {
    const { paymentRequestId, ...rest } = data;
    return api.post(
      ENDPOINTS.rejectByPrincipalPaymentRequest(id, paymentRequestId),
      rest,
    );
  }

  export function getClaims(guaranteeId: string): Promise<Array<IClaim>> {
    return api.get(ENDPOINTS.claims(guaranteeId));
  }

  export function getPaymentRequests(
    guaranteeId: string,
  ): Promise<Array<IPaymentRequest>> {
    return api.get(ENDPOINTS.paymentRequests(guaranteeId));
  }

  export function getTransactionHistory(
    id: string,
  ): Promise<Array<ITransactionEvent>> {
    return api.get(ENDPOINTS.transactions(id));
  }

  export function getTransactionStatus(id: string): Promise<ITransactionEvent> {
    return api.get(ENDPOINTS.transaction(id));
  }

  export function startRequirementDelay(
    id: string,
    data: any,
  ): Promise<TTransactionResponse> {
    const { paymentRequestId, ...rest } = data;
    return api.post(
      ENDPOINTS.startRequirementDelay(id, paymentRequestId),
      rest,
    );
  }

  export function endRequirementDelay(
    id: string,
    data: { paymentRequestId: string },
  ): Promise<TTransactionResponse> {
    const { paymentRequestId } = data;
    return api.post(ENDPOINTS.endRequirementDelay(id, paymentRequestId));
  }

  //// ZP
  export function getRequest(id: string, bank?: boolean) {
    return api
      .get<IRequest & CompanyQualification>(ENDPOINTS.request(id, bank))
      .then((res: any) => {
        if (bank) {
          return {
            ...res.request,
            otherRequests: res.otherRequests,
          };
        }

        return res;
      });
  }

  export function getPersonalCountRisk(id: string) {
    return api.get<TPersonalCount>(ENDPOINTS.personalCountRisk(), { id });
  }

  export function requestAction(
    id: string,
    action: TRequestAction,
    params?: { reason: string },
  ) {
    return api.post<TTransactionResponse>(
      ENDPOINTS.requestAction(id, action),
      params,
    );
  }
}

export function getCompanyByInnForBank(inn: string) {
  return api.get<ICompany & CompanyQualification>(
    ENDPOINTS.companyByInnForBank(inn),
  );
}
