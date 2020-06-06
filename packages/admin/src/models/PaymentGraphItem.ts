import { IPaymentGraphItem } from 'interfaces';

export class PaymentGraphItem implements IPaymentGraphItem {
  public static async New(init: IPaymentGraphItem) {
    return new PaymentGraphItem(init);
  }

  month: number;
  currentAmount: number;
  reductionAmount: number;

  constructor(init: IPaymentGraphItem) {
    Object.assign(this, init);
  }
}
