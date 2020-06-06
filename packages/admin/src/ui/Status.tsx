import * as React from 'react';
import { Box, BoxTypes } from 'grommet';
import { Text } from '@we-ui-components/base';
import {
  TTextSize,
  IProcess,
  TRequestStatus,
  TRequestFnsStatus,
} from 'interfaces';

export const REQUEST_TABLE_STATUSES: TCommonStatus<TRequestStatus> = {
  texts: {
    CREATED: 'Сформировано',
    REGULATOR_APPROVED: 'Обработано ФНС',
    BANK_DECLINED: 'Отклонено банком',
    BANK_APPROVED: 'Одобрено банком',
    CANCELED: 'Отозвано',
  },
  textColors: {
    CREATED: '#405965',
    REGULATOR_APPROVED: '#0066B3',
    BANK_DECLINED: '#F15A22',
    BANK_APPROVED: '#3DBE98',
    CANCELED: '#A4A7AB',
  },
  boxStyle: {
    CREATED: {
      backgroundColor: '#EBEEF3',
      borderRadius: 4,
      padding: '3px 8px',
      width: 160,
      alignItems: 'center',
    },
    REGULATOR_APPROVED: {
      backgroundColor: '#EBF3F9',
      borderRadius: 4,
      padding: '3px 8px',
      width: 160,
      alignItems: 'center',
    },
    BANK_DECLINED: {
      backgroundColor: '#FEF2ED',
      borderRadius: 4,
      padding: '3px 8px',
      width: 160,
      alignItems: 'center',
    },
    BANK_APPROVED: {
      backgroundColor: '#EDF9F5',
      borderRadius: 4,
      padding: '3px 8px',
      width: 160,
      alignItems: 'center',
    },
    // CANCELED: {
    //   backgroundColor: '#FEF2ED',
    //   borderRadius: 4,
    //   padding: '3px 8px',
    //   width: 160,
    //   alignItems: 'center',
    // },
    CANCELED: {
      backgroundColor: '#FFFFFF',
      borderRadius: 4,
      border: '1px solid #A4A7AB',
      color: '#A4A7AB',
      padding: '3px 8px',
      width: 160,
      alignItems: 'center',
    },
  },
};

export const REQUEST_FNS_TABLE_STATUSES: TCommonStatus<TRequestFnsStatus> = {
  texts: {
    CREATED: 'Ожидает обработки',
    PROCESSED: 'Обработано',
    BANK_DECLINED: 'Отклонено банком',
    BANK_APPROVED: 'Одобрено банком',
    CANCELED: 'Отозвано',
  },
  textColors: {
    CREATED: '#0066B3',
    PROCESSED: '#3DBE98',
    BANK_DECLINED: '#F15A22',
    BANK_APPROVED: '#3DBE98',
    CANCELED: '#A4A7AB',
  },
  boxStyle: {
    CREATED: {
      backgroundColor: '#EBF3F9',
      borderRadius: 4,
      padding: '3px 8px',
      width: 160,
      alignItems: 'center',
    },
    PROCESSED: {
      backgroundColor: '#EDF9F5',
      borderRadius: 4,
      padding: '3px 8px',
      width: 160,
      alignItems: 'center',
    },
    CANCELED: {
      backgroundColor: '#FFFFFF',
      borderRadius: 4,
      border: '1px solid #A4A7AB',
      color: '#A4A7AB',
      padding: '3px 8px',
      width: 160,
      alignItems: 'center',
    },
    BANK_APPROVED: {
      backgroundColor: '#EDF9F5',
      borderRadius: 4,
      padding: '3px 8px',
      width: 160,
      alignItems: 'center',
    },
    BANK_DECLINED: {
      backgroundColor: '#FEF2ED',
      borderRadius: 4,
      padding: '3px 8px',
      width: 160,
      alignItems: 'center',
    },
  },
};

export const getStatusTextMap = (isRegulator: boolean) =>
  isRegulator ? REQUEST_FNS_TABLE_STATUSES.texts : REQUEST_TABLE_STATUSES.texts;

export const REQUEST_STATUSES = REQUEST_TABLE_STATUSES.texts;

export type TCommonStatus<T extends keyof any> = {
  texts: Record<T, string>;
  textColors?: Record<T, string> | { ANYCASE: string };
  boxStyle?: Record<T, React.CSSProperties> | { ANYCASE: React.CSSProperties };
};

const statusHOC: React.FC<{
  statusFn: () => string;
  statuses?: TCommonStatus<any>;
  size?: TTextSize;
}> = ({ statusFn, statuses, size }) => {
  const text = statuses && statuses?.texts ? statuses?.texts[statusFn()] : '';

  const textColor =
    statuses && statuses.textColors
      ? 'ANYCASE' in statuses.textColors
        ? statuses.textColors.ANYCASE
        : statuses.textColors[statusFn()]
      : '';

  const boxStyle =
    statuses && statuses.boxStyle
      ? 'ANYCASE' in statuses.boxStyle
        ? statuses.boxStyle.ANYCASE
        : statuses.boxStyle[statusFn()]
      : null;

  return (
    <Box direction="row">
      <Box align="start" style={boxStyle}>
        <Text size={size} color={textColor}>
          {text}
        </Text>
      </Box>
    </Box>
  );
};

export const RequestTableStatus: React.FC<{
  data: IProcess;
  size?: TTextSize;
} & BoxTypes> = ({ data, size, ...props }) => (
  <Box {...props} justify="center" align="center">
    {statusHOC({
      statusFn: () => data.status,
      statuses: REQUEST_TABLE_STATUSES,
      size,
    })}
  </Box>
);

export const RequestTableFnsStatus: React.FC<{
  data: IProcess;
  size?: TTextSize;
} & BoxTypes> = ({ data, size, ...props }) => (
  <Box {...props} justify="center" align="center">
    {statusHOC({
      statusFn: () => data.fnsStatus,
      statuses: REQUEST_FNS_TABLE_STATUSES,
      size,
    })}
  </Box>
);
