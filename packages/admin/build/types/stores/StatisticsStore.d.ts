import { statusFetching } from 'we-oauth2/lib/constants/types';
import { StoreConstructor } from './core/StoreConstructor';
import { IGeneralStatistic, IBankStatistic, IFNSStatistic } from 'interfaces';
export declare class StatisticsStore extends StoreConstructor {
    fetchStatus: statusFetching;
    general: IGeneralStatistic;
    bank: IBankStatistic;
    FNS: IFNSStatistic;
    statusHandler: <T>(actionFunc: () => Promise<T>) => Promise<T>;
    init(): Promise<void>;
    clear(): void;
}
