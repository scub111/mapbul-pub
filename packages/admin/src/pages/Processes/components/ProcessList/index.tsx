import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Table } from '@we-ui-components/rc-table';
import { getColumns } from './getColumns';
import { IStores, useStores } from 'stores';
import { IProcessDetailsData, ProcessDetails } from 'pages/ProcessDetails';
import { generateProductUrl } from 'pages/Processes/utils';
import { useEffect } from 'react';
import { useRoutes } from 'utils/useRoutes';
import { getProposalFilterOptions } from 'services/suggestionService';

interface IOpenProcessModal {
  stores: IStores;
  data: IProcessDetailsData;
  processesUrl: string;
}

export function openProcessModal(props: IOpenProcessModal, urlRouting = true) {
  const { stores, data, processesUrl } = props;
  const { modals, activeProcess, operationHistories, routing } = stores;

  if (urlRouting) {
    routing.push(generateProductUrl(processesUrl, data.type, data.id, data));
  }

  modals.openModal(
    () => (
      <ProcessDetails
        onDismiss={modals.closeModal}
        id={data.id}
        type={data.type}
        processData={data}
      />
    ),
    () => {
      activeProcess.clear();
      operationHistories.clear();
      if (urlRouting) {
        routing.push(`/${processesUrl}`);
      }
    },
    {
      width: '1100px',
      isOverlayClose: true,
    },
  );
}

export const ProcessList: React.FC = observer(() => {
  const stores = useStores();
  const { processList, user, catalogs } = stores;

  const routes = useRoutes();

  const onChangeDataFlow = (props: any) => {
    processList.onChangeDataFlow(props);
  };

  useEffect(() => {
    processList.init();
  }, []);

  return (
    <Table
      columns={getColumns(user.roles, catalogs, processList)}
      data={processList.data}
      isPending={processList.isPending}
      dataLayerConfig={processList.dataFlow}
      onChangeDataFlow={onChangeDataFlow}      
      options={{
        checkboxOptionsPromise: getProposalFilterOptions,
      }}
      onRowClicked={rowData => {
        openProcessModal({
          stores,
          data: rowData,
          processesUrl: routes.processes,
        });
      }}
    />
  );
});
