import * as React from 'react';
import { IStores } from 'stores';
import { IProcessDetailsData } from 'pages/ProcessDetails';
interface IOpenProcessModal {
    stores: IStores;
    data: IProcessDetailsData;
    processesUrl: string;
}
export declare function openProcessModal(props: IOpenProcessModal, urlRouting?: boolean): void;
export declare const ProcessList: React.FC;
export {};
