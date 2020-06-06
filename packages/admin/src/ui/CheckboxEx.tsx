import * as React from 'react';
import { Box } from 'grommet';
import { Checkbox, Text, ICheckboxProps } from '@we-ui-components/base';

export const CheckboxEx: React.FC<{
  title: string;
} & ICheckboxProps> = ({ title, label, style, ...props }) => {
  return (
    <Box direction="row" align="start" style={{ minHeight: 'auto', ...style }}>
      <Checkbox label="" style={{ padding: '4px 0px' }} {...props} />
      <Box style={{ marginBottom: 10 }}>
        <Text color="Blue" size="medium">
          {title}
        </Text>
        <Text color="StandardBlack" size="small">
          {label}
        </Text>
      </Box>
    </Box>
  );
};
