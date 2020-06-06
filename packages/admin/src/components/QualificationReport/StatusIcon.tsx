import * as React from 'react';

import { BoxProps, Box } from 'grommet';
import { Check, Cross, Stop } from './icons';
import { qualificationStatusColors, QualificationStatus } from '.';
import { CSSProperties } from 'react';

type StatusIconProps = BoxProps & {
  status: QualificationStatus;
  height?: number | string;
  width?: number | string;
};

export const QualificationStatusIcon = ({
  status,
  ...wrapperProps
}: StatusIconProps & { style?: CSSProperties }) => {
  const { text: color } = qualificationStatusColors(status);

  const props = {
    color,
    height: wrapperProps.height || '33px',
    width: wrapperProps.width || '32px',
  };

  const Icon = icons[status];

  return (
    <Box {...wrapperProps}>
      <Icon {...props} />
    </Box>
  );
};

const icons: Record<QualificationStatus, IconComponent> = {
  passed: Check,
  failed: Cross,
  invalid: Stop,
};

type IconComponent = typeof Check;
