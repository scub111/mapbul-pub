import * as React from 'react';
import { Box } from 'grommet';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores';
import { General } from './General';
import { RequestCount } from './RequestCount';
import styled from 'styled-components';

interface IProps {}

const StyledBox = styled(Box)`
  flex: 1 0 100%;
  flex-direction: row;
  
  @media (max-width: 1240px) {
    flex-direction: column;
    max-width: calc(100vw - 48px);
    
    > * {
      margin-right: 0 !important;
    }
  }
`;

export const StatisticsBank: React.FC<IProps> = observer(props => {
  const { statistics } = useStores();

  return (
    <StyledBox gap="medium">
      <General data={statistics.bank} margin={{ right: 'medium' }}/>
      <RequestCount />
    </StyledBox>
  );
});
