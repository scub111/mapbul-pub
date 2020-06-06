import { IPaymentGraphData } from 'interfaces';
import { PaymentGraphItem } from 'models';

export class PaymentGraphData implements IPaymentGraphData {
  public static async New(init: IPaymentGraphData) {
    const newPaymentGraphData = new PaymentGraphData(init);
    newPaymentGraphData.graphItems = await Promise.all(
      init.graphItems.map(item => PaymentGraphItem.New(item)),
    );
    return newPaymentGraphData;
  }

  loanOutgoingTotal?: number;
  dataLoadDate?: Date;
  graphItems: Array<PaymentGraphItem>;
  tableItems: Array<PaymentGraphItem>;

  constructor(init: IPaymentGraphData) {
    this.loanOutgoingTotal = init.loanOutgoingTotal;
    this.dataLoadDate = init.dataLoadDate;
  }
}
