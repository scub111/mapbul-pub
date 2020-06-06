import * as React from 'react';
import { BoxProps } from 'grommet';
import { IBankStatistic } from 'interfaces';
interface IProps extends BoxProps {
    data: IBankStatistic;
}
export declare const General: React.FunctionComponent<IProps>;
export {};
