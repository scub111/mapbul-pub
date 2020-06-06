import * as React from 'react';
import { Text } from '@we-ui-components/base';
import { dateFormat, timeFormat, isDefined } from 'utils';
import { Box } from 'grommet';
import { withTheme } from 'styled-components';
import { IStyledProps } from 'themes';

type TProps = { value: Date } & IStyledProps

export const DateText: React.FC<TProps> = withTheme(({ value, theme }: TProps) => {
  return <Box direction="row">
    {isDefined(value) && <>
      <Text size="small" color={theme.palette.Basic800} style={{ paddingRight: '4px' }}>
        {dateFormat(value)}
      </Text>
      <Text size="small" color={theme.palette.Basic500}>
        {timeFormat(value)}
      </Text>
    </>
    }
    {!isDefined(value) && <Text size="small" color={theme.palette.Basic800}>— —</Text>}
  </Box>
});