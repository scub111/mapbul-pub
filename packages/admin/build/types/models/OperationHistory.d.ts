import { IOperationHistory, TProcessStatus } from 'interfaces';
export declare class OperationHistory implements IOperationHistory {
    static New(init: IOperationHistory): Promise<OperationHistory>;
    status: TProcessStatus;
    date: Date;
    constructor(init: IOperationHistory);
}
