import * as React from 'react';
import * as queryString from 'query-string';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores';
import { PageContainer } from 'components';
import { ProcessList } from './components/ProcessList';
import { Button, Text, Title, Tooltip, Icon } from '@we-ui-components/base';
import { Box } from 'grommet';
import { CreateCall } from 'modalPages/CreateCall';
import { showRecords } from 'utils';
import { TRole } from 'interfaces';
import { usePendingTransaction } from 'services/transactionTracker';
import { Spinner, PlusIcon, UnknownIcon } from 'ui';
import { RouteComponentProps } from 'react-router-dom';
import { useEffect } from 'react';
import { openProcessModal } from 'pages/Processes/components/ProcessList';
import { getTypeByUrlType } from './utils';
import chartSVG from './chart.svg';
import { DownloadButton } from './components/DownloadButton';
import styled from 'styled-components';
import { useRoutes } from 'utils/useRoutes';

const createOfferRoles: Array<TRole> = ['BANK', 'CALLER'];
const exportRoles: Array<TRole> = ['BANK', 'REGULATOR', 'OBSERVER'];

interface ISearchQuery {
  id?: string;
  type?: string;
  claimId?: string;
}

const iconSizes = {
  xsmall: '16px',
  small: '20px',
  medium: '57px',
};

const IconBox = styled(Box)<{ height?: string }>`
  width: auto;
  height: ${props => props.height};

  @media (max-width: 1200px) {
    height: ${() => iconSizes.small};
  }
`;

export const CompanyName: React.FC<{ companyId: string }> = props => {
  const { catalogs } = useStores();
  const { companies } = catalogs;
  const { name } =
    companies.filter(company => company.id === props.companyId)[0] ||
    ({} as any);

  return (
    <Text color="Basic500" size="small">
      {name}
    </Text>
  );
};

export const CompanyIcon: React.FC<{
  companyId: string;
  isHidden?: boolean;
  size?: 'xsmall' | 'small' | 'medium';
  margin?: any;
}> = ({ size = 'medium', companyId, isHidden, margin }) => {
  const stores = useStores();
  const { catalogs } = stores;
  const { companies } = catalogs;

  if (isHidden) {
    return null;
  }

  let tooltipTitle = 'Информация недоступна';
  let logo = '';
  if (companyId) {
    const banks = companies.filter(b => b.type === 'BANK');
    const bank = banks.find(b => b.id === companyId);
    if (bank) {
      logo = bank.meta?.logo;
      tooltipTitle = bank.name;
    }
  }

  return (
    <Tooltip text={tooltipTitle}>
      {companyId ? (
        <IconBox
          justify="start"
          align="start"
          margin={margin}
          height={iconSizes[size]}
        >
          <img
            src={`data:image/svg+xml;base64,${logo}`}
            alt=""
            style={{ width: 'auto', height: '100%' }}
          />
        </IconBox>
      ) : (
        <UnknownIcon style={{ width: 21, height: 26 }} />
      )}
    </Tooltip>
  );
};

export const ProcessesPage = observer<RouteComponentProps>(({ location }) => {
  const stores = useStores();
  const { processList, modals, user, routing } = stores;

  const routes = useRoutes();

  const pending = usePendingTransaction();
  const { companyId } = user.userInfo;

  useEffect(() => {
    const { id, type, claimId }: ISearchQuery = queryString.parse(
      location.search,
    );

    if (id && type) {
      openProcessModal({
        stores,
        data: { type: getTypeByUrlType(type), id, claimId, processId: id },
        processesUrl: routes.processes,
      });
    }
  }, [location.search, stores]);

  const createOfferAllowed = user.isContainOneOfRoles(createOfferRoles);
  const exportAllowed = user.isContainOneOfRoles(exportRoles);

  const getDescription = (): string => {
    if (user.roles.includes('CALLER')) {
      return `ИНН ${user.company.inn}`;
    }
    if (user.roles.includes('BANK')) {
      return `БИК ${user.company.meta?.bik}`;
    }
    return '';
  };

  const isBankAccount = user.isContainOneOfRoles(['BANK']);
  const isStatisticButtonVisible = user.isContainOneOfRoles([
    'BANK',
    'REGULATOR',
    'OBSERVER',
  ]);

  const resetFilters = () => {
    processList.removeFilters();
  };

  const { filters } = processList.dataFlow;
  const { totalElements = 0 } = processList.paginationData;

  const hasAnyActiveFilter = Object.values(filters).filter(i =>
    i instanceof Array ? i.length : !!i,
  ).length;

  return (
    <PageContainer>
      <Box
        direction="row"
        align="center"
        justify="between"
        margin={{ top: 'small', bottom: 'small' }}
      >
        <Box>
          <Box direction="row" align="center">
            <CompanyIcon
              companyId={companyId}
              isHidden={!isBankAccount}
              margin={{ right: 'medium' }}
            />
            <Box justify="between" pad={{ vertical: '3px' }}>
              <Box direction="row" align="center">
                <Title size="large" bold style={{ marginRight: 10 }}>
                  {user.company.name}
                </Title>
                {pending && (
                  <Box direction="row">
                    <Spinner style={{ width: 24, height: 24 }}></Spinner>
                    <Text
                      margin={{ left: 'xsmall' }}
                      color="BlackTxt"
                      style={{ opacity: 0.5 }}
                    >
                      Ваше действие обрабатывается...
                    </Text>
                  </Box>
                )}
              </Box>
              <Title size="xxsmall" style={{ opacity: 0.7 }}>
                {getDescription()}
              </Title>
            </Box>
          </Box>
        </Box>
        <Box direction="row" justify="end" align="center">
          {exportAllowed && <DownloadButton />}
          {isStatisticButtonVisible && (
            <Button
              bgColor="white"
              color="Blue"
              margin={{ left: 'medium' }}
              style={{
                borderRadius: 0,
                width: '224px',
                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.07)',
              }}
              onClick={() => routing.push(`/${routes.statistics}`)}
            >
              <Box direction="row" align="center">
                <img style={{ marginRight: 8 }} src={chartSVG} />
                Статистика
              </Box>
            </Button>
          )}
          {createOfferAllowed && (
            <Button
              style={{ width: '224px' }}
              disabled={user.hasActiveRequests}
              margin={{ left: 'medium' }}
              onClick={() =>
                new Promise(resolve => {
                  modals.openModal(
                    () => <CreateCall onClose={modals.closeModal} />,
                    null,
                    {
                      width: '900px',
                    },
                  );
                  resolve();
                })
              }
            >
              <PlusIcon size="medium" style={{ marginRight: 10 }} />
              <Text size="medium" color="white">
                Сформировать
              </Text>
            </Button>
          )}
        </Box>
      </Box>
      <Box direction="row" justify="between" align="center">
        <Text size="small" color="#9698a7" margin={{ bottom: 'small' }}>
          {totalElements ? showRecords(totalElements) : null}
        </Text>
        <Button
          bgColor="Basic200"
          disabled={!hasAnyActiveFilter}
          color="Basic800"
          style={{ width: 'unset', padding: '15px 24px', fontSize: '14px' }}
          onClick={resetFilters}
          margin={{ bottom: 'xsmall' }}
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

      <ProcessList />
    </PageContainer>
  );
});
