import * as React from 'react';
import { Box, BoxProps } from 'grommet';
import { Text } from '@we-ui-components/base';

export const DataItemEx: React.FC<{
  label: React.ReactNode;
  label2?: React.ReactNode;
  value: React.ReactNode;
  style?: object;
  bold?: boolean;
}> = ({ label, label2, value, bold, ...boxProps }) => (
  <Box flex={{ shrink: 0 }} {...(boxProps as BoxProps)}>
    <Text size="xsmall" color="#405965" style={{ paddingBottom: '6px' }}>
      {label}
    </Text>
    {label2 && (
      <Text size="xsmall" color="#405965" style={{ paddingBottom: '6px' }}>
        {label2}
      </Text>
    )}
    <Text size={bold ? 'medium' : 'small'} bold={bold}>
      {value}
    </Text>
  </Box>
);
