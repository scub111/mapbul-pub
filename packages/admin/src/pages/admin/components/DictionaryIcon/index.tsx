import * as React from 'react';
import { useState } from 'react';
import { Box, BoxProps } from 'grommet';
import { Icon } from '@we-ui-components/base';

export const DictionaryIcon: React.FC<{
  glyph: string;
  onClick?: (data: any) => void;
  forceHover?: boolean;
  size?: string;
  disable?: boolean;
} & BoxProps &
  JSX.IntrinsicElements['div']> = ({
  glyph,
  onClick,
  forceHover,
  size = '16px',
  disable,
  ...rest
}) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <Box
      justify="center"
      align="center"
      onClick={(data: any) => !disable && onClick && onClick(data)}
      onMouseEnter={() =>
        !disable && forceHover === undefined && setHover(true)
      }
      onMouseLeave={() =>
        !disable && forceHover === undefined && setHover(false)
      }
      style={{ opacity: disable ? 0.3 : 1 }}
      {...rest}
    >
      <Icon
        glyph={glyph}
        size={size}
        color={hover || forceHover ? 'Purple500' : 'Basic500'}
      />
    </Box>
  );
};
