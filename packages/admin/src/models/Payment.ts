import { IPayment } from 'interfaces';

export class Payment implements IPayment {
  public static async New(init: IPayment) {
    return new Payment(init);
  }

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

  constructor(init: IPayment) {
    Object.assign(this, init);
  }
}
