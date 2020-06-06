// import * as React from 'react';
import styled from 'styled-components';
import { Input } from '@we-ui-components/form';

export const StyledInput = styled(Input)`
  ::placeholder {
    color: ${props => props.theme.palette.Basic500};
  }
`;
