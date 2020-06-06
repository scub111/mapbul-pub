import * as React from 'react';
import { BoxTypes } from 'grommet';
import { OperationHistory, Process } from 'models';
import { TProcessStatus, TTextSize, TProcessType } from 'interfaces';
export declare const ProcessListStatus: React.FC<{
    data: Process;
    className?: string;
    size?: TTextSize;
} & BoxTypes>;
export declare const HistoryStatus: React.FC<{
    data: OperationHistory;
    processType: TProcessType;
    className?: string;
    size?: TTextSize;
} & BoxTypes>;
export declare const ProposalDetailStatus: React.FC<{
    data: {
        status: TProcessStatus;
        type: TProcessType;
    };
    className?: string;
    size?: TTextSize;
} & BoxTypes>;
