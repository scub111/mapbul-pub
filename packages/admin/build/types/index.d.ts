import * as React from 'react';
import { IStores } from 'stores';
interface AppProps {
    basename?: string;
    stores?: Partial<IStores>;
    apiPrefix?: string;
}
export declare const Base: React.FC<AppProps>;
export default Base;
