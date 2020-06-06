import { TRole } from 'interfaces';
import { CatalogsStore } from 'stores/CatalogsStore';
import { ProcessListStore } from 'stores/ProcessListStore';
export declare const getColumns: (userRoles: TRole[], catalogs: CatalogsStore, processList: ProcessListStore) => any[];
