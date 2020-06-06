import * as React from 'react';
import { ReactNode } from 'react';
import { NormalizedError } from 'services/api/errorHandler';
import { PropsWithChildren } from 'react';
import { ReactRenderFn } from 'interfaces';
export declare const ProcessFetchStatus: React.FC<PropsWithChildren<ReactNode> & {
    error: NormalizedError;
    isLoading: boolean;
    successRender?: ReactRenderFn;
}>;
