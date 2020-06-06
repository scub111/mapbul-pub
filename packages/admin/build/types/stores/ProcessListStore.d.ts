import { Process } from '../models';
import { IStores } from '../stores';
import { ListStoreConstructor } from './core/ListStoreConstructor';
export declare class ProcessListStore extends ListStoreConstructor<Process> {
    stopProcessTracking?: () => void;
    constructor(stores: IStores);
    clear(): void;
    startProcessTracking: () => void;
    trackTransaction(transactionId: string): void;
    trackProcess(transactionId: string): void;
    patchById(id: string, newValue: Partial<Process>): void;
    getCompanyByInnForBank: (inn: string) => Promise<import("../interfaces").ICompany & import("../interfaces").CompanyQualification>;
}
