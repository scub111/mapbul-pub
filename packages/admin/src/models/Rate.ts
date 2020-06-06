import { IRate } from 'interfaces/apiEntities';

export class Rate implements IRate {
  public static async New(init: IRate) {
    return new Rate(init);
  }

  value: number;
  term: number;
  amount: number | string;
  reductionValue: number;

  constructor(init: IRate) {
    this.value = init.value;
    this.term = init.term;
    this.amount = init.amount;
    this.reductionValue = init.reductionValue;
  }
}
