import { OperationHistory } from 'models';
import { TProcessType } from 'interfaces';
import { statusFetching } from 'we-oauth2/lib/constants/types';
export interface OperationHistoryParams {
    id: string;
    processType: TProcessType;
}
export declare class OperationHistoryListStore {
    fetchStatus: statusFetching;
    data: Record<string, Array<OperationHistory>>;
    getList(id: string, processType: TProcessType): Promise<void>;
    clear(): void;
}
