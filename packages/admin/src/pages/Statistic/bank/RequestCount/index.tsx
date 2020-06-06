import * as React from 'react';
import { Text, Title } from '@we-ui-components/base';
import { Box } from 'grommet';
import { observer } from 'mobx-react-lite';
import { formatWithTwoDecimals, formatZeroDecimals } from 'utils';
import { Cell, Pie, PieChart } from 'recharts';
import { IBankStatistic } from 'interfaces';
import styled from 'styled-components';
import { useStores } from 'stores';

interface IProps {}

interface IStatisticRowProps {
  color?: string;
  label: string;
  value: number;
}

const StyledBox = styled(Box)`
  &:last-child {
    margin: 0;
  }
`;

const StatisticRow = (props: IStatisticRowProps) => {
  const { color, label, value } = props;

  return (
    <StyledBox
      direction="row"
      justify="between"
      style={{ borderLeft: `2px solid ${color}`, flex: '1 1 100%' }}
      pad={{ left: 'small' }}
      margin={{ bottom: 'small' }}
    >
      <Text size="small">{label}</Text>
      <Text size="small">{String(value)}</Text>
    </StyledBox>
  );
};

interface IDiagramProps {
  data: any[];
}

const Diagram = (props: IDiagramProps) => {
  const { data } = props;

  return (
    <PieChart width={180} height={180} onMouseEnter={() => {}}>
      <Pie
        data={data}
        cx={85}
        cy={85}
        innerRadius={80}
        outerRadius={90}
        startAngle={-270}
        fill="#8884d8"
        paddingAngle={0}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
};

const getRowConfig = (data: IBankStatistic) => {
  const {
    regulatorApprovedRequests,
    bankApprovedRequests,
    bankDeclinedRequests,
    canceledRequests,
  } = data;
  return [
    {
      color: '#60AEE9',
      label: 'Ожидает рассмотрения банком',
      value: regulatorApprovedRequests,
    },
    {
      color: '#19B97C',
      label: 'Одобрено банком',
      value: bankApprovedRequests,
    },
    {
      color: '#F15A22',
      label: 'Отклонено банком',
      value: bankDeclinedRequests,
    },
    {
      color: '#A4A7AB',
      label: 'Отозвано банком',
      value: canceledRequests,
    },
  ];
};

const CenterText = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 24px;
  top: 64px;
`;

export const RequestCount: React.FC<IProps> = observer(props => {
  const { statistics } = useStores();
  const {
    requests,
    approvedRequestsPercent,
    approvedOrDeclinedRequests,
  } = statistics.bank;

  const rowConfig = getRowConfig(statistics.bank);

  return (
    <Box
      background="#FFFFFF"
      style={{ flexBasis: '1 0 auto', minWidth: 560 }}
    >
      <Box
        pad="large"
      >
        <Title margin={{ bottom: 'medium' }}>Количество заявлений</Title>
        <Box direction="row" margin={{ bottom: 'medium' }}>
          <Box style={{ width: '50%' }}>
            <Text size="small" margin={{ bottom: 'xxsmall' }}>
              Рассмотрено банком
            </Text>
            <Text size="medium">{String(approvedOrDeclinedRequests)}</Text>
          </Box>
          <Box style={{ width: '50%' }}>
            <Text size="small" margin={{ bottom: 'xxsmall' }}>
              Одобрено банком
            </Text>
            <Text size="medium">
              {formatWithTwoDecimals(approvedRequestsPercent)}%
            </Text>
          </Box>
        </Box>
        <Box
          direction="row"
          justify="between"
          align="center"
          style={{ flex: '0 1 200px' }}
        >
          <Box
            justify="center"
            align="center"
            style={{
              width: 180,
              height: 180,
              flex: '0 0 auto',
              position: 'relative',
            }}
            margin={{ right: 'xlarge' }}
          >
            <CenterText>
              <Text margin={{ bottom: 'xxsmall' }}>Всего заявлений</Text>
              <Title bold>{formatZeroDecimals(requests)}</Title>
            </CenterText>
            <Diagram data={rowConfig} />
          </Box>
          <Box align="stretch" style={{ flex: '1 1 100%', maxWidth: '50%' }} >
            {rowConfig.map(row => {
              const { color, label, value } = row;
              return (
                <StatisticRow
                  key={label}
                  color={color}
                  label={label}
                  value={value}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
});
