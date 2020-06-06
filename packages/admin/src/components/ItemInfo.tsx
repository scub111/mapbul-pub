import * as React from 'react';
import { Box } from 'grommet';
import { Text } from '@we-ui-components/base';

export const ItemInfo: React.FC<{
  title: string;
  value: string;
}> = ({ title, value, ...props }) => (
  <Box width="100%" style={{ marginBottom: 10 }} {...props}>
    <Text color="Gray8" size="xxsmall" style={{ marginBottom: 5 }}>
      {title}
    </Text>
    <Text color="Black" size="small" style={{ marginBottom: 5 }}>
      {value || props.children}
    </Text>
  </Box>
);
