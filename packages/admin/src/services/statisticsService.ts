import { api } from 'services/api';
import { ENDPOINTS } from 'services';
import { IGeneralStatistic, IBankStatistic } from '../interfaces';

export namespace statisticsService {
  export function getStatisticGeneral(): Promise<IGeneralStatistic> {
    return api.get<IGeneralStatistic>(ENDPOINTS.statisticsGeneral());
  }

  export function getStatisticBank(): Promise<IBankStatistic> {
    return api.get<IBankStatistic>(ENDPOINTS.statisticsBank());
  }
}
