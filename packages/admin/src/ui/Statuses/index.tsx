import * as React from 'react';
import * as styles from './Statuses.styl';
import * as cn from 'classnames';
import { Box, BoxTypes } from 'grommet';
import { Text } from '@we-ui-components/base';

import {PROCESS_LIST_COLORS, HISTORY_STATUSES} from './config';
import { dateFormat } from 'utils';
import { OperationHistory, Process } from 'models';
import { TProcessStatus, TTextSize, TProcessType } from 'interfaces';

type TCommonStatus<T extends keyof any> = {
  texts: Record<T, string>;
  icons?: Record<T, any> | { ANYCASE: any };
  colors?: Record<T, any> | { ANYCASE: any };
};

const statusHOC: React.FC<{
  data: {
    status: string;
  };
  className?: string;
  statusClassName?: string;
  statuses?: TCommonStatus<any>;
  size?: TTextSize;
}> = ({ data, className, statusClassName, statuses, size }) => {
  const classNameInt = cn(
    statusClassName ? statusClassName : styles.status,
    className,
    styles[data.status],
  );
  const text = statuses && statuses.texts ? statuses.texts[data.status] : '';

  let color =
    statuses && statuses.colors
      ? 'ANYCASE' in statuses.colors
        ? statuses.colors.ANYCASE
        : statuses.colors[data.status]
      : '';

  color = color || '#FFFFFF'

  return (
    <Box
      className={classNameInt}
      direction={'row'}
      style={{ whiteSpace: 'normal' }}
    >
      <Box align="start">
        <Text size={size} color={color}>
          {text}
        </Text>
      </Box>
    </Box>
  );
};

export const ProcessListStatus: React.FC<{
  data: Process;
  className?: string;
  size?: TTextSize;
} & BoxTypes> = ({ data, className, size, ...props }) => {
  return (
    <Box {...props} justify="center">
      {statusHOC({
        data,
        statuses: {
          ...HISTORY_STATUSES[data.type],
          colors: PROCESS_LIST_COLORS,
        },
        size,
      })}
    </Box>
  );
};

export const HistoryStatus: React.FC<{
  data: OperationHistory;
  processType: TProcessType;
  className?: string;
  size?: TTextSize;
} & BoxTypes> = ({ data, className, size, processType, ...props }) => {
  return (
    <Box {...props}>
      {statusHOC({
        data,
        statuses: HISTORY_STATUSES[processType],
        size,
      })}
      {data.date && (
        <Text size="xxsmall" color="#9698a7" style={{ marginTop: '2px' }}>
          {dateFormat(data.date, true)}
        </Text>
      )}
    </Box>
  );
};
export const ProposalDetailStatus: React.FC<{
  data: {
    status: TProcessStatus;
    type: TProcessType;
  };
  className?: string;
  size?: TTextSize;
} & BoxTypes> = ({ data, className, size, ...props }) => {
  return (
    <Box {...props}>
      {statusHOC({
        data,
        statuses: {
          ...HISTORY_STATUSES[data.type],
          colors: PROCESS_LIST_COLORS,
        },
        size,
      })}
    </Box>
  );
};
