import { TToken } from 'we-oauth2/lib/auth/interfaces';
import { TRole, TGuaranteeType, TRequestCompanyType } from './apiTypes';
import { RATE } from '../ui/Rate';
export interface ITokenEx extends TToken {
    accountId: string;
    personInfo: IUserInfo;
}
export interface IUserMeta {
    position?: string;
    patronymic?: string;
    permitionDocumentName?: string;
}
export interface IUserInfo {
    accountId: string;
    businessRoles: Array<TRole>;
    companyId: string;
    companyName: string;
    displayName: string;
    email: string | null;
    firstName: string;
    lastName: string;
    nodeAlias: string;
    participantAddress: string | null;
    participantPublicKey: string | null;
    personId: string;
    phone: string;
    meta: IUserMeta | null;
}
export interface IAccount {
    accountId: string;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;
    password: string | null;
    roles: Array<string>;
    username: string;
}
export interface ICompanyMeta {
    bankName: string;
    logo?: string;
    paymentAccount: string;
    directorLastName: string;
    directorFirstName: string;
    directorPatronymic: string;
    correspondentAccount: string;
    bankIdentificationCode: string;
    bik: string;
    address?: string;
    directorFullName?: {
        lastName: string;
        firstName: string;
        middleName: string;
    };
}
export interface ICompany {
    id: string;
    nodeAlias: string;
    name: string;
    shortName: string;
    type: TRole;
    address: string;
    phone: string;
    email: string;
    okpo?: string;
    ogrn: string;
    inn: string;
    kpp: string;
    meta: ICompanyMeta | null;
}
export interface IBusinessRole {
    name: TRole;
    displayName: string;
    description: string;
}
export interface ICompanyType extends IBusinessRole {
}
export interface IProcess {
    id: string;
    type: PROCESS_TYPE;
    typeName: string;
    status: string;
    created: Date;
    daysLeft: number;
    modified: Date;
    issuerName: string;
    partnerName: string;
    processId: string;
    claimId: string;
    loanNumber: string | null;
    oldCommitmentNumb: string;
    amount: number;
    acceptedAmount: number;
    fee: number;
    effectiveAmount: number;
    rate: number;
    discountValue: number | null;
    specialDiscount: number | null;
    term: number | null;
    maturityDate: Date | null;
    relevanceDate: Date | null;
    lastUnsuccessfulTxStatus?: 'PENDING' | 'SUCCESS' | null;
    lastUnsuccessfulTxId?: string | null;
    number: string;
    bankId: string;
    companyName: string;
    companyInn: string;
    bankInnSearch: string;
    fnsStatus: string;
    regulatorStatus: RATE;
    pending: boolean;
    source: SOURCE_TYPE;
    operatorCompanyName: string;
    limitPayout: number;
    multyPayout: number;
    okato: string;
    riskPersonal: boolean;
    riskBankruptcy: boolean;
    riskFinishWork: boolean;
    riskPayoutMoney: boolean;
}
export interface IProposalBare {
    relevanceDate: Date | null;
    issuerName: string;
    partnerName: string;
    rateList: Array<IRate>;
    amount?: number;
    discountValue: number | null;
    specialDiscount: number | null;
    specialTerm: number | null;
    specialRate: number | null;
    oldCommitmentNumb: string;
    signature: string;
    rejectionReason?: string;
}
export interface ICallFormData {
    commitmentName: string;
    commitmentLink?: string;
    commitmentDateFrom: Date;
    commitmentDateTo: Date;
    commitmentPrice: number | string;
    guaranteeType: TGuaranteeType;
    amount: number | string;
    dateFrom: Date;
    dateTo: Date;
    guarantorName: string;
    beneficiaryName: string;
    relevanceDate: Date;
    attachments: File[];
    signature?: string;
    penalty: string;
    paymentTerm: string;
    requirementDocumentNames?: string[];
}
export interface ICall {
    id: string;
    type: string;
    documentNumber: string;
    created: Date;
    creatorId: string;
    status: TOfferStatus;
    commitmentName: string;
    commitmentLink: string;
    commitmentDateFrom: Date;
    commitmentDateTo: Date;
    commitmentPrice: number;
    commitmentCurrency: string;
    amount: number;
    currency: string;
    dateFrom: Date;
    dateTo: Date;
    guarantorName: string;
    principalName: string;
    beneficiaryName: string;
    relevanceDate: Date;
    attachments?: File[];
    signature: string;
    modified: Date;
    rejectionReason?: string;
    penalty: string;
    paymentTerm: string;
    requirementDocumentNames?: string[];
}
export interface IGuarantee extends Pick<ICall, 'commitmentName' | 'commitmentLink' | 'commitmentDateFrom' | 'commitmentDateTo' | 'commitmentPrice'> {
    id: string;
    created: Date;
    modified: Date;
    creatorId: string;
    status: TGuaranteeStatus;
    documentNumber: string;
    type: string;
    amount: number;
    actualAmount: number;
    currency: string;
    fee: number;
    dateFrom: Date;
    dateTo: Date;
    guarantorName: string;
    principalName: string;
    beneficiaryName: string;
    rejectionReason?: string;
    penalty: string;
    paymentTerm: string;
    requirementDocumentNames?: string[];
}
export interface IClaim {
    id: string;
    status: TProcessStatus;
    creatorId: string;
    guaranteeId: string;
    created: Date;
    amount: number;
    currency: string;
    signature?: string;
    documentNumber?: string;
    rejectionReason?: string;
}
export interface IPaymentRequest {
    [name: string]: any;
}
export interface IProposal extends IProposalBare {
    id: string;
    status: TProcessStatus;
}
export interface IDictRate {
    actual: boolean;
    created: Date;
    rateId: IRate;
    modified: Date;
}
export interface IDelayReason {
    actual: boolean;
    created: Date;
    id: number;
    value: string;
}
export interface IDictDiscountRate {
    actual: boolean;
    created: Date;
    modified: Date;
    value: number;
}
export interface IDictIssuer {
    id: string;
    name: string;
    shortName: string;
    address: string;
    okpo: string;
    ogrn: string;
    inn: string;
    kpp: string;
    bankName: string;
    bankCode: string;
    paymentAccount: string;
    corrAccount: string;
    phone: string;
    email: string;
    directorLastName: string;
    directorFirstName: string;
    directorPatronymic: string;
    created: Date;
    modified: Date;
    actual: boolean;
}
export interface IRate {
    value: number;
    term: number;
    amount: number | string;
    reductionValue: number;
    actual?: boolean;
    modified?: Date;
}
export interface IOperationHistory {
    status: TProcessStatus;
    date: Date;
}
export declare const enum ENTITY_STATUS {
    IN_ACCEPTING = "IN_ACCEPTING",
    CANCELED = "CANCELED",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    DRAFT = "DRAFT",
    PRINCIPAL_ACCEPTED = "PRINCIPAL_ACCEPTED",
    GUARANTOR_ACCEPTED = "GUARANTOR_ACCEPTED"
}
export declare type TProcessStatus = ENTITY_STATUS;
export declare const enum PROCESS_TYPE {
    CALL = "CALL",
    GUARANTEE = "GUARANTEE",
    CLAIM = "CLAIM",
    REQUIREMENT = "REQUIREMENT",
    REQUEST = "REQUEST"
}
export declare const enum SOURCE_TYPE {
    BANK = "BANK",
    OPERATOR = "OPERATOR"
}
export declare const enum COMPANY_TYPE {
    LEGAL_ENTITY = "LEGAL_ENTITY ",
    INDIVIDUAL_ENTREPRENEUR = "INDIVIDUAL_ENTREPRENEUR "
}
export declare type TGuaranteeStatus = 'DRAFT' | 'IN_ACCEPTING' | 'PRINCIPAL_ACCEPTED' | 'GUARANTOR_ACCEPTED' | 'CANCELED' | 'ACCEPTED' | 'REJECTED';
export declare type TOfferStatus = 'IN_ACCEPTING' | 'REJECTED' | 'ACCEPTED';
export declare type TRequirementStatus = 'IN_PAYING' | 'IN_INQUIRING' | 'PRINCIPAL_ACCEPTED' | 'PRINCIPAL_REJECTED' | 'REJECTED' | 'DELAYED' | 'PAID';
export declare type TRequestStatus = 'CREATED' | 'REGULATOR_APPROVED' | 'BANK_DECLINED' | 'CANCELED' | 'BANK_APPROVED';
export declare type TRequestFnsStatus = 'CREATED' | 'PROCESSED' | 'CANCELED' | 'BANK_DECLINED' | 'BANK_APPROVED';
export declare type TClaimStatus = 'IN_ACCEPTING' | 'ACCEPTED' | 'REJECTED';
export interface IPaymentGraphData {
    loanOutgoingTotal?: number;
    dataLoadDate?: Date;
    graphItems: Array<IPaymentGraphItem>;
    tableItems: Array<IPaymentGraphItem>;
}
export interface IPaymentGraphItem {
    month: number;
    reductionAmount: number;
    currentAmount: number;
}
export interface IGuaranteeGraph {
    companyName: string;
    currentAmount: number;
    reductionAmount: number;
    guaranteeCount: number;
}
export interface IPayment {
    loanId: string;
    loanMaturityDate: Date;
    claimDate: Date;
    partnerName: string;
    loanNumber: string;
    loanIncomingBalance: number;
    loanPercentAmount: number;
    loanTotalAmount: number;
    claimPaymentOnTimeAmount: number;
    claimPrepaymentAmount: number;
    forfeitAmount: number;
    interestPaidAmount: number;
    loanOutgoingBalance: number;
}
export interface ICalculatedData {
    loanId?: string;
    amount?: number;
    increaseRateAmount: number;
    calculatedAmount: number | string;
    rate: number;
    newRate: number;
    rateChanged: boolean;
}
export interface ITransactionEvent {
    status: 'PENDING' | 'SUCCESS' | null;
    txId: string;
    timestamp: Date;
    bosy: string;
}
export interface IRequestFormData {
    companyType: TRequestCompanyType;
    typeCompany: number;
    companyName: string;
    companyInn: string;
    companyKpp: string;
    companyOgrn: string;
    directorFullName: string;
    bankId: string;
    loanDays: number;
    personalCount: number;
    personalMay: number;
    personalMonth: string;
    declineReasonRegulator: string;
    declineReasonBank: string;
    prefRate: number;
    limitPayout: number;
    multyPayout: number;
    multyNorthPayout: number;
    okato: string;
}
export declare enum REQUEST_STATUS {
    CREATED = "CREATED",
    BANK_APPROVED = "BANK_APPROVED",
    BANK_DECLINED = "BANK_DECLINED",
    CANCELED = "CANCELED"
}
export interface IOtherRequest {
    bankId: string;
    bankName: string;
    created: Date | string;
    id: string;
    status: REQUEST_STATUS;
}
export interface IRequest {
    bankId: string;
    bankName: string;
    bik: string;
    companyId: string;
    companyInn: string;
    companyKpp: string;
    companyName: string;
    companyOgrn: string;
    companyType: TRequestCompanyType;
    created: Date | string;
    creatorId: string;
    declineReasonBank: string;
    declineReasonRegulator: string;
    decreaseCountRisk: boolean;
    directorFullName: string;
    directorFirstName: string;
    directorLastName: string;
    directorMiddleName: string;
    id: string;
    modified: Date | string;
    number: string;
    pending: boolean;
    period: number;
    personalCount: number;
    personalMonth: number;
    personalMay: number;
    status: REQUEST_STATUS;
    otherRequests?: IOtherRequest[];
    regulatorStatus: RATE;
    acceptedAmount: number;
    limitPayout: number;
    multyPayout: number;
    multyNorthPayout: number;
    okato: string;
    lastUnsuccessfulTxStatus?: 'PENDING' | 'SUCCESS' | null;
    lastUnsuccessfulTxId?: string | null;
    prefRate: number;
    typeCompany: string;
}
export interface CompanyQualification {
    companyInn: string;
    enableHelps: boolean;
    activity: boolean;
    needHelpOkfed: boolean;
    presented: boolean;
    listOkfed: Array<any>;
    moreThanYear: boolean;
    typeCompany: number;
    workPerson: number;
    bankruptcy: boolean;
    bankruptcy12Month: boolean;
    nko: boolean;
    ipPersonalMoreZero: boolean;
}
export declare type TPersonalCount = {
    byMonth: PersonalCount[];
    startCount: number;
};
export interface PersonalCount extends IRisk {
    date: string;
    personalCount: string;
}
export interface IRisk {
    riskBankruptcy: boolean;
    riskFinishWork: boolean;
    riskPayoutMoney: boolean;
    riskPersonal: '0' | '1' | '2' | 'NO_DATA';
}
export declare enum CallerType {
    'UNKNOWN' = 0,
    'UL' = 1,
    'IP' = 2
}
