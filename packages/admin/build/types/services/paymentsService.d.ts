import { IPaymentGraphData, TRole } from 'interfaces';
export declare function getAggregatedPayments(params: {
    companyName: Array<string>;
    companyType: TRole;
    from: Date;
    to: Date;
    forDate: Date;
}): Promise<IPaymentGraphData>;
