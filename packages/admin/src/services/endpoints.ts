import { TProcessType, IRequestFormData } from 'interfaces';
import { createQS } from 'we-oauth2/lib/auth/api-utils';
import { api } from './api';

// const nodeEnv = process.env.NODE_ENV;
// const baseUrl =
//   nodeEnv === 'production' ? window.location.origin : process.env.BASE_URL;
const baseUrl = process.env.BASE_URL;

let apiPrefix = ''

export const setApiUrlPrefix = (prefix: string) => {
  apiPrefix = `/${prefix}`
}
const getApiUrl = () => `${baseUrl}/api/v0${apiPrefix}`;
const getApiUrlBase = () => `${baseUrl}/api/v0`;

export const ENDPOINTS = {
  token: () => `${getApiUrlBase()}/vst-oauth2/oauth/token`,
  accounts: () => `${getApiUrlBase()}/vst-oauth2/accounts`,
  account: (id: string) => `${getApiUrlBase()}/vst-oauth2/accounts/${id}`,
  userInfo: () => `${getApiUrlBase()}/vst-identity/persons/info`,
  logout: () => `${getApiUrlBase()}/logout`,
  companies: () => `${getApiUrlBase()}/vst-identity/companies`,
  registerCompany: () => `${getApiUrl()}/public/register`,
  registerCompanyIP: () => `${getApiUrl()}/public/register/ip`,
  registerCompanySign: () => `${getApiUrl()}/public/register/sign`,
  persons: (companyId: string) =>
    `${getApiUrlBase()}/vst-identity/persons?companyId=${companyId}`,
  person: (id: string) => `${getApiUrlBase()}/vst-identity/persons/${id}`,
  businessRoles: () => `${getApiUrlBase()}/vst-identity/business-roles`,
  companyTypes: () => `${getApiUrlBase()}/vst-identity/company-types`,

  requests: () => `${getApiUrl()}/requests`,

  processes: () => `${getApiUrl()}/processes`,
  processesDistinct: () => `${getApiUrl()}/processes/distinct`,
  processesExport: () => `${getApiUrl()}/processes/export`,
  proposals: () => `${getApiUrl()}/proposals`,
  dictRates: () => `${getApiUrl()}/dict/rates`,
  dictDelayReasons: () => `${getApiUrl()}/dict/delayReasons`,
  discountRates: () => `${getApiUrl()}/dict/discountRates`,
  dictIssuers: () => `${getApiUrl()}/dict/issuers`,
  call: (id: string) => `${getApiUrl()}/calls/${id}`,
  rejectCall: (id: string) => `${getApiUrl()}/calls/${id}/reject`,
  acceptCall: (id: string) => `${getApiUrl()}/calls/${id}/accept`,
  acceptCallSign: (id: string) => `${getApiUrl()}/calls/${id}/accept/sign`,
  rejectCallSign: (id: string) => `${getApiUrl()}/calls/${id}/reject/sign`,
  calls: () => `${getApiUrl()}/calls/`,
  getFilesAsZip: (id: string, fileName: string) =>
    `${getApiUrl()}/calls/${id}/attachments?name=${fileName}`,
  getGuaranteeFilesAsZip: (id: string, fileName: string) =>
    `${getApiUrl()}/guarantees/${id}/attachments?name=${fileName}`,
  getGuaranteeFile: (id: string, fileName: string) =>
    `${getApiUrl()}/guarantees/${id}/attachment` +
    createQS({
      fileName,
      access_token: api.getToken(),
      responseType: 'STREAM',
    }),
  guarantee: (id: string) => `${getApiUrl()}/guarantees/${id}`,

  claims: (id: string) => `${getApiUrl()}/guarantees/${id}/claims`,
  createAmountReduceCallSign: (id: string) =>
    `${getApiUrl()}/guarantees/${id}/claims/sign`,
  createAmountReduceCall: (id: string) =>
    `${getApiUrl()}/guarantees/${id}/claims`,
  acceptAmountReduceCallSign: (guaranteeId: string, claimId: string) =>
    `${getApiUrl()}/guarantees/${guaranteeId}/claims/${claimId}/accept/sign`,
  approveAmountReduceCall: (guaranteeId: string, claimId: string) =>
    `${getApiUrl()}/guarantees/${guaranteeId}/claims/${claimId}/accept`,
  rejectAmountReduceCallSign: (guaranteeId: string, claimId: string) =>
    `${getApiUrl()}/guarantees/${guaranteeId}/claims/${claimId}/reject/sign`,
  rejectAmountReduceCall: (guaranteeId: string, claimId: string) =>
    `${getApiUrl()}/guarantees/${guaranteeId}/claims/${claimId}/reject`,

  paymentRequests: (id: string) =>
    `${getApiUrl()}/guarantees/${id}/requirements`,
  createPaymentRequestSign: (id: string) =>
    `${getApiUrl()}/guarantees/${id}/requirements/sign`,
  createPaymentRequest: (id: string) =>
    `${getApiUrl()}/guarantees/${id}/requirements`,

  clarifyPaymentRequestFromPrincipal: (id: string, paymentRequestId: string) =>
    `${getApiUrl()}/guarantees/${id}/requirements/${paymentRequestId}/inquire`,

  acceptPaymentRequestSign: (id: string, paymentRequestId: string) =>
    `${getApiUrl()}/guarantees/${id}/requirements/${paymentRequestId}/acceptGuarantor/sign`,
  acceptPaymentRequest: (id: string, paymentRequestId: string) =>
    `${getApiUrl()}/guarantees/${id}/requirements/${paymentRequestId}/acceptGuarantor`,

  rejectPaymentRequestSign: (id: string, paymentRequestId: string) =>
    `${getApiUrl()}/guarantees/${id}/requirements/${paymentRequestId}/reject/sign`,
  rejectPaymentRequest: (id: string, paymentRequestId: string) =>
    `${getApiUrl()}/guarantees/${id}/requirements/${paymentRequestId}/reject`,

  acceptByPrincipalPaymentRequestSign: (id: string, paymentRequestId: string) =>
    `${getApiUrl()}/guarantees/${id}/requirements/${paymentRequestId}/acceptByPrincipal/sign`,
  acceptByPrincipalPaymentRequest: (id: string, paymentRequestId: string) =>
    `${getApiUrl()}/guarantees/${id}/requirements/${paymentRequestId}/acceptByPrincipal`,

  rejectByPrincipalPaymentRequestSign: (id: string, paymentRequestId: string) =>
    `${getApiUrl()}/guarantees/${id}/requirements/${paymentRequestId}/rejectByPrincipal/sign`,
  rejectByPrincipalPaymentRequest: (id: string, paymentRequestId: string) =>
    `${getApiUrl()}/guarantees/${id}/requirements/${paymentRequestId}/rejectByPrincipal`,

  requirementDoc: (guaranteeId: string, requirementId: string) =>
    `${getApiUrl()}/guarantees/${guaranteeId}/requirements/${requirementId}/attachment`,

  operationHistories: (id: string, processType: TProcessType) =>
    `${getApiUrl()}/operationHistory/${processType}/${id}`,
  aggregatedPayments: () => `${getApiUrl()}/graph/company`,
  detailedPayments: () => `${getApiUrl()}/payments/detailed`,
  transaction: (id: string) => `${getApiUrl()}/transactions/${id}`,
  transactions: (id: string) => `${getApiUrl()}/transactions?contractId=${id}`,
  // templates
  offerTemplate: (id: string) => `${getApiUrl()}/guarantees/${id}/attachment`,
  offerFile: (id: string) => `${getApiUrl()}/offers/${id}/file`,
  offerZip: (id: string) => `${getApiUrl()}/offers/${id}/files`,
  // sign api
  createCallSign: () => `${getApiUrl()}/calls/sign`,
  acceptGuaranteeByPrincipalSign: (id: string) =>
    `${getApiUrl()}/guarantees/${id}/acceptByPrincipal/sign`,
  acceptGuaranteeByPrincipal: (id: string) =>
    `${getApiUrl()}/guarantees/${id}/acceptByPrincipal`,
  rejectGuaranteeByPrincipalSign: (id: string) =>
    `${getApiUrl()}/guarantees/${id}/reject/sign`,
  rejectGuaranteeByPrincipal: (id: string) =>
    `${getApiUrl()}/guarantees/${id}/reject`,
  acceptGuaranteeByGuarantorSign: (id: string) =>
    `${getApiUrl()}/guarantees/${id}/acceptByGuarantor/sign`,
  acceptGuaranteeByGuarantor: (id: string) =>
    `${getApiUrl()}/guarantees/${id}/acceptByGuarantor`,
  acceptProposalSign: (id: string) =>
    `${getApiUrl()}/proposals/${id}/accept/sign`,
  rejectProposalSign: (id: string) =>
    `${getApiUrl()}/proposals/${id}/reject/sign`,
  createClaimSign: (id: string) => `${getApiUrl()}/loans/${id}/claims/sign`,

  startRequirementDelay: (guaranteeId: string, id: string) =>
    `${getApiUrl()}/guarantees/${guaranteeId}/requirements/${id}/startDelay`,
  startRequirementDelaySign: (guaranteeId: string, id: string) =>
    `${getApiUrl()}/guarantees/${guaranteeId}/requirements/${id}/startDelay/sign`,
  endRequirementDelay: (guaranteeId: string, id: string) =>
    `${getApiUrl()}/guarantees/${guaranteeId}/requirements/${id}/delayEnd`,

  request: (id: string, forBank?: boolean) =>
    `${getApiUrl()}/requests/${id}${forBank ? '/forBank' : ''}`,
  requestAction: (id: string, action: string) =>
    `${getApiUrl()}/requests/${id}/${action}`,
  companyByInnForBank: (inn: string) =>
    `${getApiUrl()}/requests/fill?inn=${inn}`,

  hasActiveRequests: () => `${getApiUrl()}/requests/hasActiveRequests`,
  calculateLimit: ({
    companyInn,
    personalCount,
  }: Pick<IRequestFormData, 'companyInn' | 'personalCount'>) =>
    `${getApiUrl()}/requests/limitPayout` +
    createQS({ inn: companyInn, personalCount }),

  // statistics
  statisticsGeneral: () => `${getApiUrl()}/statistics/general`,
  statisticsBank: () => `${getApiUrl()}/statistics/bank`,

  processPendig: (id: string) => `${getApiUrl()}/processes/${id}/pending`,

  personalCountRisk: () => `${getApiUrl()}/personal-count-risk`,
};
