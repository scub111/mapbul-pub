import * as React from 'react';
import { Box } from 'grommet';
import styled from 'styled-components';
import { Button, Icon } from '@we-ui-components/base';

export const BorderedButton = styled(Button)`
  button {
    border: 2px solid #f15a22;
  }
`;

export const BorderedButtonBlue = styled(Button)`
  button {
    border: 2px solid #0066B3;
  }
`;

export const CancelButton: typeof Button = ({
  style,
  ...props
}) => {
  return (
    <BorderedButton
      pad="13px 31px"
      color="#F15A22"
      transparent
      style={{ ...style }}
      {...props}
    >
      <Box direction="row" align="center" justify="center">
        <Box margin={{ right: 'xxsmall', bottom: '-2px' }}>
          <Icon glyph="Close" size="16px" color="#F15A22" />
        </Box>
        Отозвать
      </Box>
    </BorderedButton>
  );
};
