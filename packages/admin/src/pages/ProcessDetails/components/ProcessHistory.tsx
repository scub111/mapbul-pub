import * as React from 'react';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from 'grommet';
import { useStores } from 'stores';
import { OperationHistoryParams } from 'stores/OperationHistoryListStore';
import { HistoryStatus } from 'ui';
import { Steps } from 'components';

export const ProcessHistory: React.FC<OperationHistoryParams> = observer(
  ({ id, processType }) => {
    const { operationHistories } = useStores();
    useEffect(() => {
      operationHistories.getList(id, processType);
    }, [id, processType]);

    const { data } = operationHistories;

    if (!data[id]) {
      return null;
    }

    const options = data[id].map((item, index) => ({
      id: index,
      textRender: (_: any) => (
        <HistoryStatus
          key={index}
          style={{
            alignItems: 'flex-end',
            opacity: item.date ? 1 : '0.4',
          }}
          processType={processType}
          size="small"
          data={{ status: item.status, date: item.date }}
        />
      ),
    }));

    const firstNullDate = data[id].findIndex(item => item.date === null);
    const selected = firstNullDate === -1 ? data[id].length - 1 : firstNullDate - 1;

    return (
      <Box flex={{ shrink: 0 }}>
        <Steps selected={selected} options={options} />
      </Box>
    );
  },
);
