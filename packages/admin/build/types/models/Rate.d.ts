import { IRate } from 'interfaces/apiEntities';
export declare class Rate implements IRate {
    static New(init: IRate): Promise<Rate>;
    value: number;
    term: number;
    amount: number | string;
    reductionValue: number;
    constructor(init: IRate);
}
