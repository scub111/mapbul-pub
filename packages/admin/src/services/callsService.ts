import { api } from './api';
import { ICallFormData, IRequestFormData } from 'interfaces';
import { ENDPOINTS } from 'services';
import stores from 'stores';

export interface SignResponse {
  data: string;
}

export function create(data: ICallFormData) {
  const { processList } = stores;
  return (
    api
      .post<ICallFormData>(ENDPOINTS.calls(), data)
      // TODO: add correct types for these kind of responses
      // (transaction status is returned)
      .then(({ txId }: any) => {
        processList.trackTransaction(txId);
      })
  );
}

export function createSign(data: ICallFormData): Promise<SignResponse> {
  return api.post<SignResponse>(ENDPOINTS.createCallSign(), data);
}

export function create2(data: IRequestFormData) {
  // const data = {
  //   bankId: '0aedee93-1b48-4aae-9b60-5a7aa981cf88',
  //   requestedAmount: 123,
  //   period: 123,
  //   personalCount: 123,
  //   declineReasonRegulator: 'text',
  //   declineReasonBank: 'text',
  // };
  const { processList } = stores;
  // const newData = data;
  // delete newData.bankId;
  return api
    .post<ICallFormData>(ENDPOINTS.requests(), data)
    .then(({ txId }: any) => {
      processList.trackTransaction(txId);
    });
}
