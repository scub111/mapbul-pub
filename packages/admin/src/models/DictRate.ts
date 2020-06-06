import { IDictRate } from 'interfaces/apiEntities';
import { Rate } from './Rate';

export class DictRate implements IDictRate {
  public static async New(init: IDictRate) {
    const newDictRate = new DictRate(init);
    newDictRate.rateId = await Rate.New(init.rateId);
    return newDictRate;
  }

  actual: boolean;
  created: Date;
  rateId: Rate;
  modified: Date;

  constructor(init: IDictRate) {
    this.actual = init.actual;
    this.created = init.created;
    this.modified = init.modified;
  }
}
