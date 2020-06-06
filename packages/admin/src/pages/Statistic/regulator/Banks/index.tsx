import * as React from 'react';
import { useState } from 'react';
import { Tabs, Text, Title } from '@we-ui-components/base';
import { Box } from 'grommet';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores';
import { CompanyIcon } from 'pages/Processes';
import { formatWithTwoDecimalsRub } from 'utils';
import { AllBanksRequests } from './AllBanksRequests';

interface IProps {}

const tabs = [
  {
    id: 'summ',
    text: 'По сумме',
  },
  {
    id: 'percent',
    text: 'По доле одобренных',
  },
];

export const Banks: React.FC<IProps> = observer(() => {
  const { statistics, actionModals } = useStores();

  const { allByBank } = statistics.general;

  const [tab, setTab] = useState('summ');

  const openAllBanksModal = () => {
    new Promise(resolve => {
      actionModals.open(
        () => <AllBanksRequests data={allByBank} />,
        {
          title: 'Все банки',
          width: '720px',
          onApply: async () => {actionModals.closeLastModal()},
          applyText: 'Закрыть',
          noValidation: true,
        },
      );
      resolve();
    })
  };

  const {
    top5AcceptedAmountSum,
    top5BankByApprovedRequestsPercent,
  } = statistics.general;

  const list =
    tab === 'percent'
      ? top5BankByApprovedRequestsPercent
      : top5AcceptedAmountSum;

  return (
    <Box
      direction="column"
      pad={{ vertical: 'large' }}
      background="#FFFFFF"
      style={{ minWidth: 580, flex: '1 1 100%' }}
      justify="start"
    >
      <Box direction="row" justify="between">
        <Title pad={{ horizontal: 'large' }}>Топ банков</Title>
        <Text
          color="Blue"
          margin={{ bottom: 'medium', right: 'large' }}
          style={{ cursor: 'pointer' }}
        >
          <span onClick={openAllBanksModal}>По банкам</span>
        </Text>
      </Box>
      <Box pad={{ horizontal: 'large' }}>
        <Tabs selected={tab} onChange={setTab} tabs={tabs}></Tabs>
      </Box>

      <Box gap="8px" direction="column">
        <Box
          direction="row"
          justify="between"
          align="center"
          pad={{ horizontal: 'large', vertical: 'medium' }}
          style={{
            borderBottom: '1px solid #CDDDF0',
            borderTop: '1px solid #CDDDF0',
          }}
        >
          <Box basis="200px">
            <Text size="medium" color="Black">
              Банк
            </Text>
          </Box>
          {tab === 'percent' ? (
            <Box direction="row" basis="260px" justify="end">
              <Text size="medium" color="Black">
                Процент одобренных заявлений
              </Text>
            </Box>
          ) : (
            <Box direction="row" basis="200px" justify="end">
              <Text size="medium" color="Black">
                Одобренная сумма
              </Text>
            </Box>
          )}
        </Box>
        {list.map(row => (
          <Box
            key={row.bankId}
            direction="row"
            justify="between"
            pad={{ horizontal: 'large', vertical: 'small' }}
          >
            <Box>
              <CompanyIcon size="small" companyId={row.bankId} />
            </Box>
            {tab === 'percent' ? (
              <Box direction="row" basis="200px" justify="end">
                <Text size="medium" color="BlackTxt">
                  {`${row.value}%`}
                </Text>
              </Box>
            ) : (
              <Box direction="row" basis="200px" justify="end">
                <Text size="medium" color="BlackTxt">
                  {formatWithTwoDecimalsRub(row.value)}
                </Text>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
});
