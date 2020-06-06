import * as React from 'react';
import { PROCESS_TYPE } from 'interfaces';
export interface IProcessDetailsData {
    id: string;
    type: PROCESS_TYPE;
    claimId?: string;
    requirementId?: string;
    processId: string;
}
export declare const ProcessDetails: React.FunctionComponent<{
    id: string;
    type: PROCESS_TYPE;
    onDismiss: () => void;
    processData: IProcessDetailsData;
}>;
