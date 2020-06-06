import { IDictRate } from 'interfaces/apiEntities';
import { Rate } from './Rate';
export declare class DictRate implements IDictRate {
    static New(init: IDictRate): Promise<DictRate>;
    actual: boolean;
    created: Date;
    rateId: Rate;
    modified: Date;
    constructor(init: IDictRate);
}
