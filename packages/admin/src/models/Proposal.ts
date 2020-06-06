import { IProposal } from 'interfaces/apiEntities';
import { Rate } from './Rate';

export class Proposal implements IProposal {
  public static async New(init: IProposal) {
    const newProposal = new Proposal(init);
    newProposal.rateList = await Promise.all(
      init.rateList.map(item => Rate.New(item)),
    );
    return newProposal;
  }

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

  constructor(init: IProposal) {
    Object.assign(this, init);
  }
}
