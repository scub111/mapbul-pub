import { observable } from 'mobx';
import { IProcess } from 'interfaces';

export class Process implements IProcess {
  public static async New(init: IProcess) {
    return new Process(init);
  }

  @observable id: IProcess['id'];
  @observable type: IProcess['type'];
  @observable typeName: IProcess['typeName'];
  @observable status: IProcess['status'];
  @observable created: IProcess['created'];
  @observable daysLeft: IProcess['daysLeft'];
  @observable modified: IProcess['modified'];
  @observable issuerName: IProcess['issuerName'];
  @observable partnerName: IProcess['partnerName'];
  @observable processId: IProcess['processId'];
  @observable claimId: IProcess['claimId'];
  @observable loanNumber: IProcess['loanNumber'];
  @observable oldCommitmentNumb: IProcess['oldCommitmentNumb'];
  @observable amount: IProcess['amount'];
  @observable acceptedAmount: IProcess['acceptedAmount'];
  @observable fee: IProcess['fee'];
  @observable effectiveAmount: IProcess['effectiveAmount'];
  @observable rate: IProcess['rate'];
  @observable discountValue: IProcess['discountValue'];
  @observable specialDiscount: IProcess['specialDiscount'];
  @observable term: IProcess['term'];
  @observable maturityDate: IProcess['maturityDate'];
  @observable relevanceDate: IProcess['relevanceDate'];
  @observable lastUnsuccessfulTxStatus?: IProcess['lastUnsuccessfulTxStatus'];
  @observable lastUnsuccessfulTxId?: IProcess['lastUnsuccessfulTxId'];

  @observable bankId: IProcess['bankId'];
  @observable number: IProcess['number'];
  @observable companyName: IProcess['companyName'];
  @observable companyInn: IProcess['companyInn'];
  @observable bankInnSearch: IProcess['bankInnSearch'];
  @observable fnsStatus: IProcess['fnsStatus'];
  @observable regulatorStatus: IProcess['regulatorStatus'];
  @observable pending: IProcess['pending'];
  @observable source: IProcess['source'];
  @observable operatorCompanyName: IProcess['operatorCompanyName'];

  @observable limitPayout: IProcess['limitPayout'];
  @observable multyPayout: IProcess['multyPayout'];
  @observable okato: IProcess['okato'];
  @observable riskPersonal: IProcess['riskPersonal'];
  @observable riskBankruptcy: IProcess['riskBankruptcy'];
  @observable riskFinishWork: IProcess['riskFinishWork'];
  @observable riskPayoutMoney: IProcess['riskPayoutMoney'];

  constructor(init: IProcess) {
    Object.assign(this, init);
  }
}
