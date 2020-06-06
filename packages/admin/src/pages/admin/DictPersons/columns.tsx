import * as React from 'react';
import { TParams } from 'interfaces';
import { Box } from 'grommet';
import { UserInfo } from 'models';
import { printDefined, printSimple } from 'utils';
import { TooltipText } from 'ui';
import { Icon } from '@we-ui-components/base';

export const columns = [
  {
    title: 'ФИО',
    sortable: true,
    width: 300,
    dataIndex: 'lastName',
    valueGetter: ({ data }: TParams<UserInfo>) =>
      `${printDefined(data.lastName)} ${printDefined(
        data.firstName,
      )} ${printSimple(data.meta?.patronymic)}`,
    render: (value: any, data: UserInfo) => (
      <TooltipText
        text={`${printDefined(data.lastName)} ${printDefined(
          data.firstName,
        )} ${printSimple(data.meta?.patronymic)}`}
        limit={250}
      />
    ),
  },
  {
    title: 'Логин',
    sortable: true,
    width: 200,
    dataIndex: 'username',
    render: (value: any, data: UserInfo) => (
      <TooltipText text={printDefined(value)} />
    ),
  },
  {
    title: 'Контакты',
    sortable: true,
    width: 270,
    dataIndex: 'email',
    valueGetter: ({ data }: TParams<UserInfo>) => printDefined(data.email),
    render: (value: any, data: UserInfo) => (
      <Box>
        <Box direction="row" align="center">
          <Icon
            glyph="Mail"
            size="12px"
            color="Blue"
            style={{ marginRight: 5 }}
          />
          <TooltipText text={printDefined(data.email)} />
        </Box>
        <Box direction="row" align="center">
          <Icon
            glyph="Phone"
            size="12px"
            color="Blue"
            style={{ marginRight: 5 }}
          />
          <TooltipText text={printDefined(data.phone)} />
        </Box>
      </Box>
    ),
  },
  {
    title: 'ID',
    sortable: true,
    width: 350,
    dataIndex: 'personId',
    valueGetter: ({ data }: TParams<UserInfo>) => printDefined(data.personId),
    render: (value: any, data: UserInfo) => (
      <TooltipText
        style={{ userSelect: 'text' }}
        text={printDefined(data.personId)}
        limit={350}
      />
    ),
  },
];
