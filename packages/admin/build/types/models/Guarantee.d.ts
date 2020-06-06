import { IGuaranteeGraph } from 'interfaces';
export declare class Guarantee {
    static New(init: IGuaranteeGraph): Promise<Guarantee>;
    companyName: string;
    currentAmount: number;
    reductionAmount: number;
    guaranteeCount: number;
    constructor(init: IGuaranteeGraph);
}
