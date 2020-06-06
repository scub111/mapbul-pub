import { IPaymentGraphItem } from 'interfaces';
export declare class PaymentGraphItem implements IPaymentGraphItem {
    static New(init: IPaymentGraphItem): Promise<PaymentGraphItem>;
    month: number;
    currentAmount: number;
    reductionAmount: number;
    constructor(init: IPaymentGraphItem);
}
