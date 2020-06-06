import * as React from 'react';
import { Text, Tooltip } from '@we-ui-components/base';
import { TTextSize } from 'interfaces';
import { CSSProperties } from 'react';
import { Box } from 'grommet';
import { getTextLimitIndex } from 'utils';

export const TooltipText: React.FC<{
  text: string;
  limit?: number;
  size?: TTextSize;
  style?: CSSProperties;
}> = ({ text, size, limit = 200, style }) => {
  const limitIndex = getTextLimitIndex(text, limit);
  return (
    <Box style={{ ...style }}>
      {limitIndex > 0 ? (
        <Tooltip text={text}>
          <Text size={size}>{text.slice(0, limitIndex) + '...'}</Text>
        </Tooltip>
      ) : (
        <Text size={size}>{text}</Text>
      )}
    </Box>
  );
};
