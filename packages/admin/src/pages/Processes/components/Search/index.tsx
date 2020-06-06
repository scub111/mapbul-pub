import * as React from 'react';
import { useStores } from 'stores';
import { Box } from 'grommet';
import { Icon, Button } from '@we-ui-components/base';
import { observer } from 'mobx-react';

export const ProcessSearch = observer(() => {
  const { processList } = useStores();
  const areFiltersApplied =
    Object.values(processList.dataFlow.filters).filter(i => !!i).length > 0;

  const resetFilters = () => processList.removeFilters();

  return (
    <Box direction="row" justify="end" margin={{ bottom: 'small' }}>
      <Button
        bgColor="Basic200"
        disabled={!areFiltersApplied}
        color="Basic800"
        style={{ width: 'unset', padding: '15px 24px', fontSize: '14px' }}
        onClick={resetFilters}
      >
        <Icon
          size="16px"
          glyph="FilterClear"
          color="Basic500"
          style={{ marginRight: 10 }}
        />
        Очистить фильтры
      </Button>
    </Box>
  );
});
