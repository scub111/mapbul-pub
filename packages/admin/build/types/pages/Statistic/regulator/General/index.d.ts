import * as React from 'react';
import { BoxProps } from 'grommet';
import { IGeneralStatistic } from 'interfaces';
interface IProps extends BoxProps {
    data: IGeneralStatistic;
}
export declare const General: React.FunctionComponent<IProps>;
export {};
