import { StoreConstructor } from './StoreConstructor';
import { statusFetching } from 'we-oauth2/lib/constants/types';
import { NormalizedError } from 'services/api/errorHandler';
interface ServerResponse<T> {
    content: T[];
    size: number;
    totalPages: number;
    totalElements: number;
}
export interface ListData<T> {
    list: T[];
    size: number;
    totalPages: number;
    totalElements: number;
}
interface IListStoreOptions {
    pollingInterval?: number;
    paginationData?: IPagination;
    sorter?: string[];
    sorters?: ISorters;
    filters?: IFilters;
    isLocal?: boolean;
}
declare type TSorter = 'none' | 'asc' | 'desc';
interface ISorters {
    [name: string]: TSorter;
}
interface IFilters {
    [name: string]: any;
}
interface IPagination {
    currentPage?: number;
    totalPages?: number;
    totalElements?: number;
    pageSize?: number;
}
interface IDataFlowProps {
    paginationData?: IPagination;
    sorter?: string | string[];
    sorters?: ISorters;
    filters?: IFilters;
}
export declare class ListStoreConstructor<T> extends StoreConstructor {
    allData: T[];
    fetchStatus: statusFetching;
    paginationData: IPagination;
    sorters: ISorters;
    sorter: string | string[];
    filters: IFilters;
    fetchError: NormalizedError;
    endpointFn: (params: any) => Promise<{
        content: T[];
        [name: string]: any;
    }>;
    debouncedFetch: any;
    pollingInterval: number;
    tId: number;
    reactionId: any;
    isLocal: boolean;
    get isPending(): boolean;
    constructor(stores: any, endpoint: (params: any) => Promise<{
        content: T[];
    }>, options: IListStoreOptions);
    init(options?: IListStoreOptions): void;
    get dataFlow(): {
        paginationData: IPagination;
        sorters: ISorters;
        sorter: string | string[];
        filters: IFilters;
    };
    onChangeDataFlow: (props: IDataFlowProps, withDebounce?: boolean) => any;
    removeFilters(): void;
    updatePagination(res: ServerResponse<T>): void;
    get queryParams(): {
        sort: string | string[];
        size: number;
        page: number;
    };
    get filteredData(): T[];
    get sortedData(): T[];
    get data(): T[];
    fetch: (params?: any, isSilent?: boolean) => Promise<any>;
    clear(): void;
}
export {};
