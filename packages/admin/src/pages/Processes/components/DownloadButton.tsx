import * as React from 'react';
import { Button, Icon } from '@we-ui-components/base/';
import { ENDPOINTS, api } from 'services';
import { createQS } from 'we-oauth2/lib/auth/api-utils';
import * as moment from 'moment';
import { downloadFile } from 'utils';
import { useStores } from 'stores';
import { observer } from 'mobx-react-lite';

export const DownloadButton: typeof Button = observer(props => {
  const stores = useStores();

  const handleDownload = () => {
    const node = document.createElement('a');

    document.body.appendChild(node);
    downloadFile(node, url(stores.processList.queryParams), fileName());
    document.body.removeChild(node);
  };

  return (
    <Button
      bgColor="white"
      color="Blue"
      style={{
        borderRadius: 0,
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.07)',
      }}
      onClick={handleDownload}
      {...props}
    >
      <Icon margin={{ right: 'xxsmall' }} glyph="Document2" /> Экспорт
    </Button>
  );
});

const url = (searchParams: Record<string, any>) =>
  ENDPOINTS.processesExport() +
  createQS({
    access_token: api.getToken(),
    filename: fileName(),
    ...searchParams,
  });

const fileName = () => `EX_SBK_${moment().format('YYYYMMDD_HHmm')}.xlsx`;
