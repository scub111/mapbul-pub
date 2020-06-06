import { action, observable } from 'mobx';
import { statusFetching } from 'we-oauth2/lib/constants/types';
import { StoreConstructor } from './core/StoreConstructor';
import { IGeneralStatistic, IBankStatistic, IFNSStatistic } from 'interfaces';
import { statisticsService } from 'services/statisticsService';

export class StatisticsStore extends StoreConstructor {
  @observable
  public fetchStatus: statusFetching = 'init';

  @observable general: IGeneralStatistic;
  @observable bank: IBankStatistic;
  @observable FNS: IFNSStatistic;

  @action.bound
  statusHandler = <T>(actionFunc: () => Promise<T>) => {
    this.fetchStatus = 'fetching';

    return actionFunc()
      .then(res => {
        this.fetchStatus = 'success';

        return Promise.resolve(res);
      })
      .catch(err => {
        console.error(err);

        this.fetchStatus = 'error';

        throw err;
      });
  };

  init() {
    const { user } = this.stores;
    const isRegulator = user.isContainOneOfRoles(['REGULATOR', 'OBSERVER']);

    if(isRegulator) {
      return this.statusHandler(() =>
        Promise.all([
          statisticsService.getStatisticGeneral(),
        ]).then(([general]) => {
          this.general = general;
        }),
      );
    }

    return this.statusHandler(() =>
      Promise.all([
        statisticsService.getStatisticBank(),
      ]).then(([bank]) => {
        this.bank = bank;
      }),
    );
  }

  @action.bound
  public clear() {
    this.general = null;
    this.bank = null;
    this.fetchStatus = 'init';
  }
}
