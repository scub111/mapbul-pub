import { IPayment } from 'interfaces';
export declare class Payment implements IPayment {
    static New(init: IPayment): Promise<Payment>;
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
    constructor(init: IPayment);
}
