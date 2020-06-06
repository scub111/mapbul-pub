import * as React from 'react';
import { Box, BoxProps } from 'grommet';
import { IStyledProps } from 'themes';
import { Title } from '@we-ui-components/base';
import { DataItem } from '@we-ui-components/base';

type TProps = {
  name: string;
  ogrn: string;
  inn: string;
  kpp: string;
  directorFullName?: {
    lastName: string;
    firstName: string;
    middleName: string;
  };
} & IStyledProps &
  BoxProps;

export const CompanyInfo: React.FC<TProps> = ({
  name,
  ogrn,
  inn,
  kpp,
  directorFullName,
}: TProps) => {
  const isUL = inn.length === 10;

  const fullName = [
    directorFullName.lastName,
    directorFullName.firstName,
    directorFullName.middleName,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  return (
    <Box gap="22px">
      <Title color="Black">Заявитель</Title>
      <DataItem
        label="Наименование организации/обособленного подразделения организации"
        value={name}
      />
      <Box direction="row" justify="between">
        <DataItem label="ИНН" value={inn} />
        <DataItem label="КПП" value={kpp} />
        <DataItem label="ОГРН" value={ogrn} />
      </Box>
      {isUL && <DataItem label="ФИО руководителя" value={fullName} />}
    </Box>
  );
};
