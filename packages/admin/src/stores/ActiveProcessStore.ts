import { action, computed, observable } from 'mobx';
import { statusFetching } from 'we-oauth2/lib/constants/types';
import {
  processService,
  SignResponse,
  TRequestAction,
  TTransactionResponse,
} from 'services';
import * as moment from 'moment';
import {
  ICall,
  IGuarantee,
  IClaim,
  IPaymentRequest,
  PROCESS_TYPE,
  IRequest,
  CompanyQualification,
  TPersonalCount, IRequestFormData, IRisk,
} from '../interfaces';
import { track } from 'services/transactionTracker';
import stores from 'stores';
import { NormalizedError } from 'services/api/errorHandler';
import * as proposalService from '../services';

export interface IObjWithLinks {
  guaranteeId?: string;
  callId?: string;
  claimId?: string;
  requestId?: string;
}

const handleEntityUpdate = (id: string) => ({ txId }: TTransactionResponse) => {
  stores.processList.patchById(id, {
    lastUnsuccessfulTxId: txId,
    lastUnsuccessfulTxStatus: 'PENDING',
  });
};

export class ActiveProcessStore {
  @observable actionStatus: statusFetching = 'init';
  @observable personalCountStatus: statusFetching = 'init';
  @observable personalCountError: NormalizedError;

  @observable isPending: boolean = true;

  @observable callData: ICall;
  @observable guaranteeData: IGuarantee;
  @observable claimsData: IClaim[];
  @observable paymentRequestData: IPaymentRequest[];

  //ZP
  requestData: IRequest & CompanyQualification & IRisk;
  personalCount: TPersonalCount;

  @observable links: IObjWithLinks = {};
  @observable lastProcessType: PROCESS_TYPE;

  @action.bound
  saveLinks(obj: IObjWithLinks) {
    const idKeys: Array<keyof IObjWithLinks> = [
      'callId',
      'guaranteeId',
      'claimId',
      'requestId',
    ];

    idKeys.forEach(property => {
      if (obj[property]) {
        this.links[property] = obj[property];
      }
    });
  }

  @computed
  public get docName() {
    const data: any = this.getDataByType(this.lastProcessType);
    if (data && data.documentNumber) {
      return data.documentNumber;
    }

    return 'Гарантия_';
  }

  public getDataByType(type: PROCESS_TYPE) {
    switch (type) {
      case PROCESS_TYPE.CALL:
        return this.callData;
      case PROCESS_TYPE.REQUEST:
        return this.requestData;
      case PROCESS_TYPE.GUARANTEE:
      case PROCESS_TYPE.CLAIM:
      case PROCESS_TYPE.REQUIREMENT:
        return this.guaranteeData;
      default:
        return this.callData;
    }
  }

  @action.bound
  actionCreator = <T>(actionFunc: () => Promise<T>) => {
    this.actionStatus = 'fetching';

    return actionFunc()
      .then(res => {
        this.actionStatus = 'success';

        return Promise.resolve(res);
      })
      .catch(err => {
        console.error(err);

        this.actionStatus = 'error';

        throw err;
      });
  };

  @action.bound
  public async createCall(data: IRequestFormData) {
    return this.actionCreator<ICall>(() =>
      proposalService.create2(data).then((data: any) => {
        this.actionStatus = 'success';

        return Promise.resolve(data);
      })
    );
  }

  @action.bound
  public getCall(id: string) {
    this.lastProcessType = PROCESS_TYPE.CALL;

    return this.actionCreator<ICall>(() =>
      processService.getCall(id).then(res => {
        this.callData = res;

        this.saveLinks({ ...res, callId: id });

        return Promise.resolve(this.callData);
      }),
    );
  }

  @action.bound
  public getGuarantee(id: string) {
    this.lastProcessType = PROCESS_TYPE.GUARANTEE;

    return this.actionCreator<IGuarantee>(() =>
      processService.getGuarantee(id).then(res => {
        this.guaranteeData = res;

        this.saveLinks({ ...res, guaranteeId: id });

        return Promise.resolve(this.guaranteeData);
      }),
    );
  }

  @action.bound
  public reloadLastProcess(): Promise<any> {
    switch (this.lastProcessType) {
      case PROCESS_TYPE.CALL:
        return this.getCall(this.links.callId).then(() =>
          stores.operationHistories.getList(
            this.links.callId,
            PROCESS_TYPE.CALL,
          ),
        );
      case PROCESS_TYPE.GUARANTEE:
      case PROCESS_TYPE.CLAIM:
      case PROCESS_TYPE.REQUIREMENT:
      case PROCESS_TYPE.REQUEST:
        return this.getGuarantee(this.links.guaranteeId).then(async () => {
          await stores.operationHistories.getList(
            this.links.guaranteeId,
            PROCESS_TYPE.GUARANTEE,
          );

          try {
            const claims = await this.getClaims(this.links.guaranteeId);
            await Promise.all(
              claims.map(claim =>
                stores.operationHistories.getList(claim.id, PROCESS_TYPE.CLAIM),
              ),
            );
            const paymentRequests = await this.getPaymentRequests(
              this.links.guaranteeId,
            );
            await Promise.all(
              paymentRequests.map(paymentRequest =>
                stores.operationHistories.getList(
                  paymentRequest.id,
                  PROCESS_TYPE.REQUIREMENT,
                ),
              ),
            );
          } catch (e) {
            console.warn('Load Error:', e.message);
          }
        });

      case PROCESS_TYPE.REQUEST:
        return this.getRequest(this.links.requestId).then(() => {
          stores.operationHistories.getList(
            this.links.requestId,
            PROCESS_TYPE.REQUEST,
          );
        });
    }
  }

  @action.bound
  public acceptCallSign(id: string, data: any) {
    return this.actionCreator<TTransactionResponse>(() =>
      processService.acceptCallSign(id, data),
    ).then(handleEntityUpdate(id));
  }

  @action.bound
  public rejectCall(id: string, params: { signature: string; reason: string }) {
    return this.actionCreator<TTransactionResponse>(() =>
      processService.rejectCall(id, params),
    ).then(handleEntityUpdate(id));
  }

  @action.bound
  public acceptCall(
    id: string,
    params: { signature: string; term: number; rate: number },
  ) {
    return this.actionCreator<TTransactionResponse>(() =>
      processService.acceptCall(id, params),
    ).then(handleEntityUpdate(id));
  }

  @action.bound
  public acceptGuaranteeByPrincipal(id: string, params: { signature: string }) {
    return this.actionCreator<TTransactionResponse>(() =>
      processService.acceptGuaranteeByPrincipal(id, params),
    ).then(handleEntityUpdate(id));
  }

  @action.bound
  public rejectGuaranteeByPrincipal(
    id: string,
    params: { signature: string; reason: string },
  ) {
    return this.actionCreator<TTransactionResponse>(() =>
      processService.rejectGuaranteeByPrincipal(id, params),
    ).then(handleEntityUpdate(id));
  }

  @action.bound
  public acceptGuaranteeByGuarantor(id: string, params: { signature: string }) {
    return this.actionCreator<TTransactionResponse>(() =>
      processService.acceptGuaranteeByGuarantor(id, params),
    ).then(handleEntityUpdate(id));
  }

  @action.bound
  public createAmountReduceCall(
    id: string,
    params: { signature: string },
  ): Promise<any | SignResponse> {
    return this.actionCreator<TTransactionResponse>(() =>
      processService.createAmountReduceCall(id, params),
    ).then(handleEntityUpdate(id));
  }

  @action.bound
  public acceptAmountReduceCall(
    id: string,
    params: { signature: string },
  ): Promise<any | SignResponse> {
    return this.actionCreator<TTransactionResponse>(() =>
      processService.acceptAmountReduceCall(id, params),
    ).then(handleEntityUpdate(id));
  }

  @action.bound
  public rejectAmountReduceCall(
    id: string,
    params: { signature: string },
  ): Promise<any | SignResponse> {
    return this.actionCreator<TTransactionResponse>(() =>
      processService.rejectAmountReduceCall(id, params),
    ).then(handleEntityUpdate(id));
  }

  @action.bound
  public clarifyPaymentRequestFromPrincipal(
    id: string,
    params: { paymentRequestId: string },
  ): Promise<any | SignResponse> {
    return this.actionCreator<TTransactionResponse>(() =>
      processService.clarifyPaymentRequestFromPrincipal(id, params),
    ).then(handleEntityUpdate(id));
  }

  @action.bound
  public acceptPaymentRequest(
    id: string,
    params: { signature: string },
  ): Promise<any | SignResponse> {
    return this.actionCreator<TTransactionResponse>(() =>
      processService.acceptPaymentRequest(id, params),
    ).then(handleEntityUpdate(id));
  }

  @action.bound
  public rejectPaymentRequest(
    id: string,
    params: { signature: string; paymentRequestId: string },
  ): Promise<any | SignResponse> {
    return this.actionCreator<TTransactionResponse>(() =>
      processService.rejectPaymentRequest(id, params),
    ).then(handleEntityUpdate(id));
  }

  @action.bound
  public acceptByPrincipalPaymentRequest(
    id: string,
    params: { signature: string },
  ): Promise<any | SignResponse> {
    return this.actionCreator<TTransactionResponse>(() =>
      processService.acceptByPrincipalPaymentRequest(id, params),
    ).then(handleEntityUpdate(id));
  }

  @action.bound
  public rejectByPrincipalPaymentRequest(
    id: string,
    params: { signature: string },
  ): Promise<any | SignResponse> {
    return this.actionCreator<TTransactionResponse>(() =>
      processService.rejectByPrincipalPaymentRequest(id, params),
    ).then(handleEntityUpdate(id));
  }

  @action.bound
  public startRequirementDelay(
    id: string,
    params: { signature: string },
  ): Promise<any | SignResponse> {
    return this.actionCreator<TTransactionResponse>(() =>
      processService.startRequirementDelay(id, params),
    ).then(handleEntityUpdate(id));
  }

  @action.bound
  public endRequirementDelay(
    id: string,
    params: { paymentRequestId: string },
  ): Promise<any | SignResponse> {
    return this.actionCreator<TTransactionResponse>(() =>
      processService.endRequirementDelay(id, params),
    ).then(handleEntityUpdate(id));
  }

  @action.bound
  public getClaims(loanId: string) {
    this.lastProcessType = PROCESS_TYPE.CLAIM;

    return this.actionCreator<Array<IClaim>>(() =>
      processService.getClaims(loanId).then(res => {
        this.claimsData = res;

        this.claimsData = this.claimsData.sort((a, b) =>
          moment(a.created).isAfter(b.created) ? -1 : 1,
        );

        return Promise.resolve(this.claimsData);
      }),
    );
  }

  @action.bound
  public getPaymentRequests(guaranteeId: string) {
    this.lastProcessType = PROCESS_TYPE.REQUIREMENT;

    return this.actionCreator<Array<IPaymentRequest>>(() =>
      processService.getPaymentRequests(guaranteeId).then(res => {
        this.paymentRequestData = res;

        this.paymentRequestData = this.paymentRequestData.sort((a, b) =>
          moment(a.created).isAfter(b.created) ? -1 : 1,
        );

        return Promise.resolve(this.paymentRequestData);
      }),
    );
  }

  @action.bound
  public createPaymentRequest(
    id: string,
    params: { signature: string },
  ): Promise<any | SignResponse> {
    return this.actionCreator<TTransactionResponse>(() =>
      processService.createPaymentRequest(id, params),
    ).then(handleEntityUpdate(id));
  }

  //ZP

  @action.bound
  public getRequest(id: string, bank?: boolean) {
    this.lastProcessType = PROCESS_TYPE.REQUEST;

    return this.actionCreator<IRequest>(() =>
      processService.getRequest(id, bank).then(res => {
        this.requestData = res;
        this.isPending = res.pending;

        if (res.pending && !!res.lastUnsuccessfulTxId) {
          const currentProccessId = res.id;

          track(res.lastUnsuccessfulTxId, async () => {
            await this.reloadLastProcess();

            if (currentProccessId === this.requestData.id) {
              this.isPending = false;
            }
          });
        }

        this.saveLinks({ ...res, requestId: id });

        return Promise.resolve(this.requestData);
      }),
    );
  }

  @action.bound
  public getPersonalCountRisk(id: string) {
    this.personalCountStatus = 'fetching';

    processService
      .getPersonalCountRisk(id)
      .then(res => {
        this.personalCount = res;
        //this.personalCount.byMonth['2020-04'] = null;
        this.personalCountStatus = 'success';
      })
      .catch(err => {
        this.personalCountStatus = 'error';
        this.personalCountError = err;
        console.error(err);
      });
  }

  @action.bound
  public requestAction(
    id: string,
    action: TRequestAction,
    params?: {
      reason: string;
    },
  ): Promise<any | SignResponse> {
    return this.actionCreator<TTransactionResponse>(() =>
      processService.requestAction(id, action, params),
    ).then(handleEntityUpdate(id));
  }

  @action.bound
  public clear() {
    this.actionStatus = 'init';
    this.callData = null;
    this.guaranteeData = null;
    this.requestData = null;
    this.claimsData = [];
    this.paymentRequestData = [];
    this.links = {};
    this.isPending = true;
    this.personalCount = null;
    this.personalCountStatus = 'init';
  }
}
