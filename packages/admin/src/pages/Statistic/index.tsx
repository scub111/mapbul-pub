import * as React from 'react';
import { Box } from 'grommet';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores';
import { useEffect } from 'react';
import { Loader } from '@we-ui-components/base';
import { BackButton } from 'components';
import { StatisticsBank } from './bank';
import { StatisticsRegulator } from './regulator';

interface IProps {}

export const Statistics: React.FC<IProps> = observer(props => {
  const { statistics, user } = useStores();

  const isRegulator = user.isContainOneOfRoles(['REGULATOR', 'OBSERVER']);
  const isBank = user.isContainOneOfRoles(['BANK']);

  useEffect(() => {
    statistics.init();
  }, []);

  return (
    <Box margin="large">
      <BackButton />
      {statistics.fetchStatus === 'success' ? (
        <Box gap="medium" direction="row" align="center" margin={{vertical: 'large' }}>
          {isBank && <StatisticsBank />}
          {isRegulator && <StatisticsRegulator />}
        </Box>
      ) : (
        <Loader />
      )}
    </Box>
  );
});
