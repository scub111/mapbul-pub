import { IPaymentGraphData } from 'interfaces';
import { PaymentGraphItem } from 'models';
export declare class PaymentGraphData implements IPaymentGraphData {
    static New(init: IPaymentGraphData): Promise<PaymentGraphData>;
    loanOutgoingTotal?: number;
    dataLoadDate?: Date;
    graphItems: Array<PaymentGraphItem>;
    tableItems: Array<PaymentGraphItem>;
    constructor(init: IPaymentGraphData);
}
