import { api } from './api';
import { IPaymentGraphData, TRole } from 'interfaces';
import { ENDPOINTS } from './endpoints';

export function getAggregatedPayments(params: {
  companyName: Array<string>;
  companyType: TRole;
  from: Date;
  to: Date;
  forDate: Date;
}): Promise<IPaymentGraphData> {
  const queryParams = {
    companyName: params.companyName,
    companyType: params.companyType,
    year: new Date(params.from).getFullYear()
  };

  return api.get(ENDPOINTS.aggregatedPayments(), queryParams);
}
