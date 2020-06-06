import { TProcessType, IOperationHistory } from 'interfaces';
export declare function getOperationHistories(id: string, processType: TProcessType): Promise<Array<IOperationHistory>>;
