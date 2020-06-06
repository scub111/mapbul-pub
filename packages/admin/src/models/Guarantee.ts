import { IGuaranteeGraph } from 'interfaces';

export class Guarantee {
  public static async New(init: IGuaranteeGraph) {
    return new Guarantee(init);
  }

  companyName: string;
  currentAmount: number;
  reductionAmount: number;
  guaranteeCount: number;

  constructor(init: IGuaranteeGraph) {
    Object.assign(this, init);
  }
}
