import { Process } from '../models';
import { IStores } from '../stores';
import { ListStoreConstructor } from './core/ListStoreConstructor';
import {
  processService,
  getCompanyByInnForBank,
} from 'services/processService';
import { action, reaction } from 'mobx';
import { track, trackProcess } from '../services/transactionTracker';

export class ProcessListStore extends ListStoreConstructor<Process> {
  stopProcessTracking?: () => void;

  constructor(stores: IStores) {
    super(stores, processService.getProcessList, { pollingInterval: 5e4 });

    this.clear = action(this.clear.bind(this));

    reaction(
      () =>
        this.data &&
        this.data
          .filter(
            item =>
              item.lastUnsuccessfulTxStatus === 'PENDING' &&
              item.lastUnsuccessfulTxId != null,
          )
          .map(item => item.lastUnsuccessfulTxId),
      txIds => {
        if (!txIds || !txIds.length) {
          return;
        }
        txIds.forEach(id => this.trackTransaction(id));
      },
    );

    this.startProcessTracking();
  }

  clear() {
    super.clear();
    if (typeof this.stopProcessTracking === 'function') {
      this.stopProcessTracking();
      this.stopProcessTracking = null;
    }
  }

  startProcessTracking = () => {
    if (typeof this.stopProcessTracking !== 'function') {
      this.stopProcessTracking = reaction(
        () =>
          this.data &&
          this.data.filter(item => !!item.pending).map(item => item.id),
        ids => {
          if (!ids || !ids.length) {
            return;
          }
          ids.forEach(id => this.trackProcess(id));
        },
      );
    }
  };

  @action.bound
  trackTransaction(transactionId: string) {
    track(transactionId, () => this.fetch({}, true));
  }

  @action.bound
  trackProcess(transactionId: string) {
    trackProcess(transactionId, () => this.fetch({}, true));
  }

  @action.bound
  patchById(id: string, newValue: Partial<Process>) {
    this.allData = this.allData.map(item =>
      item.id === id ? { ...item, ...newValue } : item,
    );
  }

  getCompanyByInnForBank = (inn: string) => getCompanyByInnForBank(inn);
}
