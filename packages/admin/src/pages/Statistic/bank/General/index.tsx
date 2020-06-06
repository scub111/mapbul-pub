import * as React from 'react';
import { Title, Text } from '@we-ui-components/base';
import { Box, BoxProps } from 'grommet';
import { observer } from 'mobx-react-lite';
import { IBankStatistic } from 'interfaces';
import { formatZeroDecimals, formatWithTwoDecimals } from 'utils';

interface IProps extends BoxProps {
  data: IBankStatistic;
}

export const General = observer<IProps>(({ data, ...wrapperProps }) => (
  <Box
    direction="column"
    pad="large"
    background="#FFFFFF"
    style={{ flex: '1 0 auto', minWidth: '560px' }}
    {...wrapperProps}
  >
    <Box direction="row" margin={{ bottom: 'medium' }}>
      <DataItem
        width="50%"
        label="Количество налогоплательщиков, подавших заявление в банк"
        value={`${formatZeroDecimals(data.callers)} организаций`}
      />
      <DataItem
        width="50%"
        label="Количество налогоплательщиков"
        value={`${formatZeroDecimals(data.callers)} организаций`}
      />
    </Box>
    <Box direction="row">
      <DataItem
        width="50%"
        label="Кредиты одобрены на сумму"
        value={formatMoney(data.approvedAmountSum)}
      />
      <DataItem
        width="50%"
        label="Средняя одобренная сумма"
        value={`${formatMoney(data.approvedAmountSumAvg)}`}
      />
    </Box>
  </Box>
));

type DataItemProps = BoxProps & {
  label: React.ReactNode;
  value?: React.ReactNode;
};

const DataItem = ({ label, value, ...props }: DataItemProps) => (
  <Box {...props}>
    <Text size="small">{label}</Text>
    <Title margin={{ top: '9px' }} size="large">
      {value}
    </Title>
  </Box>
);

const formatMoney = (money: number) => {
  try {
    const [sum, suffix] = roundToBiggestFactor(money);
    const formatter =
      money > 10 ** 6 ? formatWithTwoDecimals : formatZeroDecimals;

    return `${formatter(sum)} ${suffix} ₽`;
  } catch (e) {
    console.error(e);

    return `${money} ₽`;
  }
};

const roundToBiggestFactor = (number: number): [number, string] => {
  if (!number) {
    return [0, ''];
  }

  const factorsWithName: [number, string][] = [
    [10 ** 9, 'млрд.'],
    [10 ** 6, 'млн.'],
    [1, ''],
  ];

  const [factor, factorName] = factorsWithName.find(
    ([factor]) => number / factor > 1,
  );

  return [number / factor, factorName];
};
