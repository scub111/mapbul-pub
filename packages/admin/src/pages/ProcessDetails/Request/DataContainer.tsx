import * as React from 'react';
import { Box } from 'grommet';
import { IRequest, CompanyQualification, IRisk } from 'interfaces';
import { observer } from 'mobx-react-lite';
import { RateLine } from 'ui';
import { RequestData } from './RequestData';
import { PersonalCountData } from './PersonalCount';
import { useState } from 'react';
import { Tabs } from '@we-ui-components/base';
import { RiskNotification } from 'ui/Risk';
import { useStores } from 'stores';
import { Error } from 'ui';

enum TAB_ID {
  'REQUEST' = 'REQUEST',
  'COUNT' = 'COUNT',
}

const tabs: Array<{
  id: TAB_ID;
  text: string;
}> = [
  {
    id: TAB_ID.REQUEST,
    text: 'Заявление',
  },
  {
    id: TAB_ID.COUNT,
    text: 'Численность',
  },
];

export const DataContainer = observer<{
  data: IRequest & CompanyQualification & IRisk;
  showCount: boolean;
  children: React.ReactNode;
}>(({ data, showCount, children }) => {
  const [tab, setTab] = useState<TAB_ID>(TAB_ID.REQUEST);
  const { activeProcess } = useStores();
  const { personalCountStatus } = activeProcess;

  const renderBody = () => {
    switch (tab) {
      case TAB_ID.REQUEST:
        return <RequestData data={data}>{children}</RequestData>;

      case TAB_ID.COUNT:
        return (
          <>
            {personalCountStatus === 'error' ? (
              <Error error={activeProcess.personalCountError} />
            ) : (
              <PersonalCountData />
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Box gap="22px" style={{ flexBasis: 800 }}>
      <div
        style={{
          borderBottom: '1px solid rgb(231, 236, 247)',
          margin: '0 0 18px -40px',
          minWidth: '810px',
        }}
      >
        <Box pad={{ horizontal: 'xlarge' }}>
          {showCount ? (
            <Tabs
              selected={tab}
              onChange={value => setTab(value as TAB_ID)}
              tabs={tabs}
            ></Tabs>
          ) : null}
        </Box>
      </div>

      {data.regulatorStatus ? <RateLine status={data.regulatorStatus} /> : null}
      <RiskNotification {...data} />

      {renderBody()}
    </Box>
  );
});
