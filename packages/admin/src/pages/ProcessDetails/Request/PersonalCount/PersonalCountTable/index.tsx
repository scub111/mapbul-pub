import * as React from 'react';
import { Box } from 'grommet';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores';
import { PersonalCountDataView } from './PersonalCountDataView';
import { sortBy } from 'lodash';

export const PersonalCountTable: typeof Box = observer(boxProps => {
  const { activeProcess } = useStores();
  const { personalCount, personalCountStatus } = activeProcess;

  if (personalCountStatus !== 'success') {
    return null;
  }

  const counts = sortBy(personalCount.byMonth, ({ date }) => date);

  return (
    <Box
      width="707px"
      direction="row"
      margin={{ left: '20px' }}
      wrap
      alignContent="stretch"
      {...boxProps}
    >
      {counts.map(it => (
        <PersonalCountDataView {...it} />
      ))}
    </Box>
  );
});
