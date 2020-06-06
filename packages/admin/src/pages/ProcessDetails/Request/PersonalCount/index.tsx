import * as React from 'react';
import { Box } from 'grommet';
import { observer } from 'mobx-react-lite';
import { PersonalCountChart } from './PersonalCountChart';
import { PersonalCountTable } from './PersonalCountTable';

export const PersonalCountData = observer<{}>(() => {
  return (
    <Box gap="22px">
      <PersonalCountChart />
      <PersonalCountTable />
    </Box>
  );
});
