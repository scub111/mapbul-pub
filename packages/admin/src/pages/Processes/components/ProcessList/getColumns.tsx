import * as React from 'react';
import { TRole, IProcess } from 'interfaces';
import { formatWithTwoDecimals, P, dateTimeFormat, isDefined } from 'utils';
import { Text, Tooltip } from '@we-ui-components/base';
import {
  RequestTableStatus,
  Spinner,
  getStatusTextMap,
  TooltipText,
  SpinnerLine,
  UnknownIcon,
  RiskPersonalIcon,
  RiskBankruptcyIcon,
  RiskPayoutMoneyIcon,
  RiskFinishWorkIcon,
} from 'ui';
import { CatalogsStore } from 'stores/CatalogsStore';
import { ProcessListStore } from 'stores/ProcessListStore';
import { CompanyIcon } from 'pages/Processes';
import { SOURCE_TYPE_MAP, COUNT_RISK_MAP } from './config';
import { EmptyString } from 'constants/strings';
import { Box } from 'grommet';

export const getColumns = (
  userRoles: TRole[],
  catalogs: CatalogsStore,
  processList: ProcessListStore,
) => {
  const hasRole = (role: TRole) => userRoles.includes(role);

  const bankInnSearch =
    processList.dataFlow.filters[P<IProcess>(p => p.bankInnSearch)];

  const isShowBankColumn =
    hasRole('CALLER') ||
    hasRole('REGULATOR') ||
    hasRole('OBSERVER') ||
    bankInnSearch !== undefined;

  const isRegulator = hasRole('REGULATOR');

  const fullColumns: Array<any> = [
    {
      title: 'Номер заявления',
      dataIndex: P<IProcess>(p => p.number),
      key: P<IProcess>(p => p.number),
      width: 210,
      fixed: 'left',
      sortable: true,
      filter: {
        name: P<IProcess>(p => p.number),
        type: 'search',
        position: 'bottomCenter',
      },
      render: (value: any, data: IProcess) => {
        if (!data) return null;
        return <Text size="medium">{value}</Text>;
      },
    },
    {
      title: 'Статус',
      width: 180,
      dataIndex: P<IProcess>(p => p.status),
      key: P<IProcess>(p => p.status),
      defaultSort: isRegulator ? 'asc' : '',
      fixed: 'left',
      sortable: true,
      filter: {
        name: P<IProcess>(p => p.status),
        type: 'select',
        textMap: getStatusTextMap(isRegulator),
        position: 'bottomCenter',
      },
      render: (value: any, data: IProcess) => {
        if (!data) return null;
        return data.lastUnsuccessfulTxStatus === 'PENDING' ? (
          <Spinner style={{ width: 16, height: 16 }} />
        ) : (
          <>
            <RequestTableStatus data={data} size="small" />
          </>
        );
      },
    },
    {
      title: 'Одобренная сумма (₽)',
      dataIndex: P<IProcess>(p => p.acceptedAmount),
      key: P<IProcess>(p => p.acceptedAmount),
      width: 250,
      filter: {
        name: P<IProcess>(p => p.acceptedAmount),
        type: 'numberRange',
      },
      sortable: true,
      cellStyle: { 'justify-content': 'flex-end' },
      render: (value: any, data: IProcess) => {
        if (!data) return null;
        return data.pending ? (
          <SpinnerLine />
        ) : (
          <Text size="medium">{formatWithTwoDecimals(value)}</Text>
        );
      },
    },
    {
      title: 'Кредитный лимит (₽)',
      dataIndex: P<IProcess>(p => p.limitPayout),
      key: P<IProcess>(p => p.limitPayout),
      width: 230,
      filter: {
        name: P<IProcess>(p => p.limitPayout),
        type: 'numberRange',
      },
      sortable: true,
      cellStyle: { 'justify-content': 'flex-end' },
      render: (value: any, data: IProcess) => {
        if (!data) return null;
        return data.pending ? (
          <SpinnerLine />
        ) : (
          <Text size="medium">{formatWithTwoDecimals(value)}</Text>
        );
      },
    },
    {
      title: 'Дата создания',
      dataIndex: P<IProcess>(p => p.created),
      key: P<IProcess>(p => p.created),
      defaultSort: 'desc',
      width: 180,
      filter: {
        name: P<IProcess>(p => p.created),
        type: 'dateRange',
      },
      sortable: true,
      render: (value: any) => {
        if (!value) return null;
        return <Text size="medium">{dateTimeFormat(value)}</Text>;
      },
      hide: hasRole('PRINCIPAL'),
    },
    {
      title: 'Риски',
      dataIndex: P<IProcess>(p => p.riskPersonal),
      key: P<IProcess>(p => p.riskPersonal),
      width: 150,
      filter: {
        name: P<IProcess>(p => p.riskPersonal),
        type: 'select',
        textMap: COUNT_RISK_MAP,
      },
      sortable: true,
      cellStyle: { 'justify-content': 'flex-start' },
      render: (value: any, data: IProcess) => {
        if (!data) return null;

        if (!isDefined(data.bankId))
          return <UnknownIcon style={{ width: 21, height: 26 }} />;

        return (
          <Box direction="row" gap="12px">
            {data.riskPersonal && (
              <Tooltip text={'Численность заявителя снизилась'}>
                <RiskPersonalIcon color="Red" size="xlarge" />
              </Tooltip>
            )}
            {data.riskBankruptcy && (
              <Tooltip text={'Сообщение о банкротстве'}>
                <RiskBankruptcyIcon size="xlarge" />
              </Tooltip>
            )}
            {data.riskFinishWork && (
              <Tooltip text={'Деятельность заявителя приостановлена'}>
                <RiskFinishWorkIcon size="xlarge" />
              </Tooltip>
            )}
            {data.riskPayoutMoney && (
              <Tooltip text={'Средняя заработная плата заявителя ниже МРОТ'}>
                <RiskPayoutMoneyIcon size="xlarge" />
              </Tooltip>
            )}
          </Box>
        );
      },
      hide: hasRole('CALLER'),
    },
    {
      title: 'Заявитель',
      dataIndex: P<IProcess>(p => p.companyName),
      key: P<IProcess>(p => p.companyName),
      width: 350,
      filter: {
        name: P<IProcess>(p => p.companyName),
        type: 'select',
      },
      sortable: true,
      render: (value: any, data: IProcess) => {
        if (!data) return null;
        return <TooltipText text={value} limit={450} />;
      },
      hide: hasRole('CALLER'),
    },
    {
      title: 'ИНН',
      dataIndex: P<IProcess>(p => p.companyInn),
      key: P<IProcess>(p => p.companyInn),
      minWidth: 150,
      maxWidth: 150,
      width: 150,
      filter: {
        name: P<IProcess>(p => p.companyInn),
        type: 'search',
      },
      sortable: true,
      render: (value: any, data: IProcess) => {
        if (!data) return null;
        return <Text size="medium">{value}</Text>;
      },
      hide: hasRole('CALLER'),
    },
    {
      title: 'Канал поступления',
      dataIndex: P<IProcess>(p => p.source),
      key: P<IProcess>(p => p.source),
      width: 250,
      filter: {
        name: P<IProcess>(p => p.source),
        type: 'select',
        textMap: SOURCE_TYPE_MAP,
      },
      sortable: true,
      render: (value: any, data: IProcess) => {
        if (!data) return null;
        return <Text size="medium">{SOURCE_TYPE_MAP[data.source]}</Text>;
      },
      hide: !(hasRole('BANK') || hasRole('REGULATOR') || hasRole('OBSERVER')),
    },
    {
      title: 'Зарегистрировано организацией',
      dataIndex: P<IProcess>(p => p.operatorCompanyName),
      key: P<IProcess>(p => p.operatorCompanyName),
      width: 350,
      sortable: false,
      render: (value: any, data: IProcess) => {
        if (!data) return null;
        return (
          <>
            {data.source === 'BANK' ? (
              <CompanyIcon size="xsmall" companyId={data.bankId} />
            ) : (
              <Text size="medium">
                {isDefined(value) ? value : EmptyString}
              </Text>
            )}
          </>
        );
      },
      hide: !(hasRole('BANK') || hasRole('REGULATOR') || hasRole('OBSERVER')),
    },
  ];

  if (isShowBankColumn) {
    const col = {
      title: 'Банк',
      dataIndex: P<IProcess>(p => p.bankId),
      key: P<IProcess>(p => p.bankId),
      width: 180,
      filter: {
        name: P<IProcess>(p => p.bankId),
        type: 'select',
        normalize: (value: string) => catalogs.getCompanyById(value)?.name,
      },
      render: (value: any, data: IProcess) => {
        return data && data.pending ? (
          <SpinnerLine />
        ) : (
          <div style={{ display: 'flex' }}>
            <CompanyIcon size="xsmall" companyId={data.bankId} />
          </div>
        );
      },
    };

    fullColumns.splice(4, 0, col);
  }

  return fullColumns.map(it => ({
    ...it,
    suppressMenu: true,
    suppressMovable: true,
  }));
};
