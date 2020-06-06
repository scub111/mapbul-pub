import { OperationHistory } from 'models';
import { getOperationHistories } from 'services';
import { TProcessType, IOperationHistory } from 'interfaces';
import { observable, action } from 'mobx';
import { statusFetching } from 'we-oauth2/lib/constants/types';

export interface OperationHistoryParams {
  id: string;
  processType: TProcessType;
}

export class OperationHistoryListStore {
  @observable
  public fetchStatus: statusFetching = 'init';

  @observable
  public data: Record<string, Array<OperationHistory>> = {};

  @action.bound
  public getList(id: string, processType: TProcessType) {
    this.fetchStatus = 'fetching';
    return getOperationHistories(id, processType)
      .then(async (data: Array<IOperationHistory>) => {
        this.data[id] = await Promise.all(
          data.map(async item => await OperationHistory.New(item)),
        );
        this.fetchStatus = 'success';
      })
      .catch(() => {
        this.fetchStatus = 'error';
      });
  }

  clear() {
    this.data = {};
    this.fetchStatus = 'init';
  }
}
