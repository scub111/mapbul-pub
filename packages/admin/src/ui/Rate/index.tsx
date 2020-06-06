import { Box } from 'grommet';
import { RateIcon } from 'ui';
import { Text } from '@we-ui-components/base';
import * as React from 'react';

export enum RATE {
  AAA = 'AAA',
  AA = 'AA',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

export interface IRateConfig {
  title: string;
  background: string;
  color: string;
  iconColor?: string;
}

export const REGULATOR_STATUS: Record<RATE, IRateConfig> = {
  AAA: {
    title: 'Численность не превышает данные ФНС о численности',
    background: 'rgba(25, 185, 124, 0.1)',
    color: '#19B97C',
  },
  AA: {
    title: 'Численность не превышает данные ФНС о численности',
    background: 'rgba(25, 185, 124, 0.1)',
    color: '#19B97C',
  },
  A: {
    title: 'Численность не превышает данные ФНС о численности',
    background: 'rgba(25, 185, 124, 0.1)',
    color: '#19B97C',
  },
  B: {
    title: 'Численность незначительно превышает данные ФНС о численности',
    background: 'rgba(255, 208, 55, 0.1)',
    color: '#405965',
    iconColor: 'rgb(255, 208, 55)',
  },
  C: {
    title: 'Численность существенно превышает данные ФНС о численности',
    background: 'rgba(241, 146, 34, 0.1)',
    color: '#F19222',
  },
  D: {
    title: 'Численность значительно превышает данные ФНС о численности',
    background: '#FCDED3',
    color: '#F15A22',
  },
};

export const Circle = ({
  color,
  children,
}: {
  color: string;
  children?: React.ReactNode;
}) => {
  return (
    <Box
      style={{
        background: color,
        width: 30,
        height: 30,
        borderRadius: 50,
      }}
      justify="center"
      align="center"
      margin={{ right: 'xsmall' }}
    >
      {children}
    </Box>
  );
};

export const RateCircle = ({ status }: { status: RATE }) => {
  const rateConfig = REGULATOR_STATUS[status];

  if (!rateConfig) {
    return null;
  }

  return (
    <Circle color={rateConfig.iconColor || rateConfig.color}>
      <RateIcon rate={status} />
    </Circle>
  );
};

export const RateLine = ({ status }: { status: RATE }) => {
  const rateConfig = REGULATOR_STATUS[status];

  if (!rateConfig) {
    return null;
  }

  return (
    <Box
      style={{
        background: rateConfig.background,
        borderRadius: 4,
      }}
      direction="row"
      justify="start"
      align="center"
      pad="small"
      width={{ max: 'unset', min: '770px' }}
    >
      <RateCircle status={status} />
      <Text color={rateConfig.color}>{rateConfig.title}</Text>
    </Box>
  );
};
