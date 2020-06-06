import { IGeneralStatistic, IBankStatistic } from '../interfaces';
export declare namespace statisticsService {
    function getStatisticGeneral(): Promise<IGeneralStatistic>;
    function getStatisticBank(): Promise<IBankStatistic>;
}
