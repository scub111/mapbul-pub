import { IProposal } from 'interfaces/apiEntities';
import { Rate } from './Rate';
export declare class Proposal implements IProposal {
    static New(init: IProposal): Promise<Proposal>;
    id: string | null;
    relevanceDate: Date | null;
    issuerName: string;
    partnerName: string;
    rateList: Array<Rate>;
    amount: number;
    discountValue: number | null;
    specialDiscount: number | null;
    specialTerm: number | null;
    specialRate: number | null;
    oldCommitmentNumb: string;
    signature: string;
    rejectionReason: string;
    status: IProposal['status'];
    constructor(init: IProposal);
}
