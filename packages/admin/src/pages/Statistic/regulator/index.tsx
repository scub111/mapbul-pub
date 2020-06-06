import * as React from 'react';
import { Box } from 'grommet';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores';
import { Banks } from './Banks';
import { General } from './General';
import { RequestCount } from './RequestCount';
import styled from 'styled-components';


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

interface IProps {}

export const StatisticsRegulator: React.FC<IProps> = observer(props => {
  const { statistics } = useStores();

  return (
    <Box gap="medium" style={{ flex: '1 0 100%' }}>
      <StyledBox gap="medium" margin={{ bottom: 'medium' }}>
        <General data={statistics.general} />
      </StyledBox>
      <StyledBox gap="medium">
        <RequestCount margin={{ right: 'medium' }} />
        <Banks />
      </StyledBox>
    </Box>
  );
});
