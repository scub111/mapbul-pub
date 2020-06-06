import {
  TProcessStatus,
  TProcessType,
  TGuaranteeStatus,
  TClaimStatus,
  TOfferStatus,
  TRequirementStatus,
  REQUEST_STATUS,
} from 'interfaces';

type TCommonStatus<T extends keyof any> = {
  texts: Record<T, string>;
  icons?: Record<T, any> | { ANYCASE: any };
  colors?: Record<T, any> | { ANYCASE: any };
};

export const PROCESS_LIST_COLORS: Record<TProcessStatus, string> = {
  IN_ACCEPTING: '#ee9f18',
  CANCELED: '#bab8cc',
  DRAFT: '#4740a1',
  REJECTED: '#eb4d4b',
  ACCEPTED: '#3fbe99',
  GUARANTOR_ACCEPTED: '#3fbe99',
  PRINCIPAL_ACCEPTED: '#4740a1',
};

export const OFFER_HISTORY_STATUSES: TCommonStatus<TOfferStatus> = {
  texts: {
    IN_ACCEPTING: 'На рассмотрении',
    REJECTED: 'Отклонена',
    ACCEPTED: 'Принята',
  },
  colors: {
    ANYCASE: '#30303d',
  },
};

export const GUARANTEE_HISTORY_STATUSES: TCommonStatus<TGuaranteeStatus> = {
  texts: {
    DRAFT: 'Проект',
    PRINCIPAL_ACCEPTED: 'Согласована принципалом',
    GUARANTOR_ACCEPTED: 'Согласована гарантом',
    CANCELED: 'Прекращена',
    REJECTED: 'Отклонена',
    ACCEPTED: 'Принята',
    IN_ACCEPTING: 'На рассмотрении',
  },
  colors: {
    ANYCASE: '#30303d',
  },
};

export const CLAIM_HISTORY_STATUSES: TCommonStatus<TClaimStatus> = {
  texts: {
    IN_ACCEPTING: 'На рассмотрении',
    ACCEPTED: 'Принята',
    REJECTED: 'Отклонена',
  },
  colors: {
    ANYCASE: '#30303d',
  },
};

export const REQUIREMENT_HISTORY_STATUSES: TCommonStatus<TRequirementStatus> = {
  texts: {
    IN_PAYING: 'Ожидает оплаты',
    IN_INQUIRING: 'На уточнении у принципала',
    PRINCIPAL_REJECTED: 'Отклонено принципалом',
    PRINCIPAL_ACCEPTED: 'Согласовано принципалом',
    REJECTED: 'Отклонено гарантом',
    DELAYED: 'Приостановлено',
    PAID: 'Оплачено',
  },
  colors: {
    ANYCASE: '#30303d',
  },
};

export const REQUEST_HISTORY_STATUSES: TCommonStatus<REQUEST_STATUS> = {
  texts: {
    CREATED: 'Сформировано',
    BANK_DECLINED: 'Отклонено банком',
    BANK_APPROVED: 'Одобрено банком',
    CANCELED: 'Отозвано',
  },
  colors: {
    ANYCASE: '#30303d',
  },
};


export const HISTORY_STATUSES: Record<
  TProcessType,
  TCommonStatus<TGuaranteeStatus & TOfferStatus & TClaimStatus & TRequirementStatus & REQUEST_STATUS>
> = {
  GUARANTEE: GUARANTEE_HISTORY_STATUSES,
  CLAIM: CLAIM_HISTORY_STATUSES,
  CALL: OFFER_HISTORY_STATUSES,
  REQUIREMENT: REQUIREMENT_HISTORY_STATUSES,
  REQUEST: REQUEST_HISTORY_STATUSES,
};

export const PROCESS_TYPES: Record<TProcessType, string> = {
  CALL: 'Заявка',
  GUARANTEE: 'Гарантия',
  CLAIM: 'Заявка на снижение суммы',
  REQUIREMENT: 'Требование платежа',
  REQUEST: 'Заявление',
};

const processStatuses = {};

Object.values(HISTORY_STATUSES).forEach(statuses =>
  Object.keys(statuses.texts).forEach(
    key => (processStatuses[key] = statuses.texts[key]),
  ),
);

export const PROCESS_STATUSES: Record<string, string> = processStatuses;
