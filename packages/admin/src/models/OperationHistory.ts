import { IOperationHistory, TProcessStatus } from 'interfaces';

export class OperationHistory implements IOperationHistory {
  public static async New(init: IOperationHistory) {
    return new OperationHistory(init);
  }

  status: TProcessStatus;
  date: Date;

  constructor(init: IOperationHistory) {
    this.status = init.status;
    this.date = init.date;
  }
}
