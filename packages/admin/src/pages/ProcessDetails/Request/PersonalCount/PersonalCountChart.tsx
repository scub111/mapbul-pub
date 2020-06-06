import * as React from 'react';
import * as _ from 'lodash';
import './PersonalCountChart.scss';
import { Box } from 'grommet';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores';
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
  BarChart,
  Bar,
} from 'recharts';
import {
  P,
  dateTimeFormat,
  getMonthNameUpperShort,
  getTextLength,
} from 'utils';
import { Text, Title } from '@we-ui-components/base';
import { CSSProperties } from 'react';
import { Error } from 'ui';

interface IChartData {
  month: number;
  value: number | null;
}

export const LegendItem: React.FC<{
  text: string;
  value: string;
  color?: string;
  style?: CSSProperties;
}> = ({ value, text, color = 'white', style }) => {
  return (
    <Box style={{ ...style }}>
      <Box direction="row" align="center" style={{ marginBottom: 5 }}>
        <div
          style={{
            borderLeft: `2px solid ${color}`,
            height: 16,
            marginRight: 13,
          }}
        />
        <Text size="small">{text}</Text>
      </Box>
      <Text size="small" style={{ marginLeft: 15 }}>
        {value}
      </Text>
    </Box>
  );
};

export const ReferenceLabel: React.FC<{
  textShift1?: number;
  textShift2?: number;
  yOffset?: number;
  viewBox?: { x: number; y: number; width: number; height: number };
  dy?: number;
  dx?: number;
}> = ({ textShift1 = 0, textShift2 = 0, yOffset = 15, viewBox, dy, dx }) => {
  const x = viewBox.x;
  const y = viewBox.y + yOffset;
  const recWidth = 100;
  const recHeigth = 35;
  return (
    <svg>
      <line
        x="4"
        stroke="#CDDDF0"
        stroke-width="1"
        fill="none"
        fill-opacity="1"
        x1={x}
        y1={viewBox.height + 10}
        x2={x}
        y2={y + 35}
      ></line>
      <path
        d={`M0 0 L${recWidth} 0 L${recWidth} ${recHeigth} L0 ${recHeigth}`}
        fill="white"
        transform={`translate(${x - 50 + textShift1}, ${y - 13})`}
      />
      <text
        x={x - 40 + textShift1}
        y={y}
        dy={dy}
        dx={dx}
        fill="#0066B3"
        fontSize={12}
      >
        Время подачи
      </text>
      <text
        x={x - 30 + textShift2}
        y={y + 15}
        dy={dy}
        dx={dx}
        fill="#0066B3"
        fontSize={12}
      >
        заявления
      </text>
      <path
        d="M6.5 9 L0 0L13 0 L6.5 9"
        fill="#0066B3"
        transform={`translate(${x - 6}, ${y + 25})`}
      />
    </svg>
  );
};

export const PersonalCountChart = observer<{}>(() => {
  const { activeProcess } = useStores();

  const { personalCount, requestData, personalCountStatus } = activeProcess;

  if (personalCountStatus !== 'success') {
    return null;
  }

  const dates = personalCount.byMonth;

  if (dates.length === 0) return <Error error="Данные отсутствуют" />;
  const year = dates[0].date.slice(0, 4);

  let data = _.sortBy(
    dates.map(
      date =>
        ({
          month: Number(date.date.slice(5, 7)),
          value:
            typeof date.personalCount === 'string'
              ? Number(date.personalCount)
              : 0,
        } as IChartData),
    ),
    P<IChartData>(p => p.month),
  );

  const maxValue = data.reduce((prev, current) =>
    prev.value > current.value ? prev : current,
  ).value;
  const maxTextLength = getTextLength(String(maxValue), 14);

  const createdMonth = new Date(requestData.created).getMonth() + 1;
  const lastMonth = data[data.length - 1].month;
  const isEqualMonth = createdMonth === lastMonth;

  return (
    <Box gap="20px" style={{ marginLeft: 20 }}>
      <Title color="Black" size="large">
        Численность за {year}, человек
      </Title>
      <ResponsiveContainer
        className="personalCountChart"
        width={'100%'}
        height={400}
      >
        <BarChart
          data={data}
          margin={{ left: -40 + maxTextLength, bottom: 10, right: 30, top: 10 }}
          barCategoryGap={1}
        >
          <CartesianGrid
            style={{ stroke: '#CDDDF0' }}
            horizontal={true}
            vertical={false}
          />
          <XAxis
            dataKey={P<IChartData>(p => p.month)}
            tickLine={false}
            tick={{ fill: '#A4A7AB', transform: 'translate(0, 10)' }}
            stroke=""
            tickFormatter={m => getMonthNameUpperShort(m - 1)}
            tickCount={data.length}
          />
          <YAxis
            tickLine={true}
            tick={{ fill: '#A4A7AB', transform: 'translate(-5, 0)' }}
            tickCount={maxValue >= 10 ? 10 : maxValue <= 1 ? 1 : maxValue}
            domain={[0, 1]}
            stroke="#CDDDF0"
          />
          {typeof personalCount.startCount === 'number' && (
            <ReferenceLine
              y={personalCount.startCount}
              stroke="#F15A22"
              strokeWidth={3}
            />
          )}
          <ReferenceLine
            x={createdMonth}
            label={
              <ReferenceLabel
                textShift1={isEqualMonth ? -30 : 0}
                textShift2={isEqualMonth ? -20 : 0}
              />
            }
            stroke=""
          />
          <Bar
            dataKey={P<IChartData>(p => p.value)}
            stackId="1"
            fill="#0066B3"
            barSize={data.length < 6 ? 26 : 16}
            animationDuration={500}
          />
        </BarChart>
      </ResponsiveContainer>
      <Box direction="row" width="100%" style={{ marginBottom: 16 }}>
        {typeof personalCount.startCount === 'number' && (
          <LegendItem
            text="Численность на дату подачи заявления, человек"
            value={String(personalCount.startCount)}
            color={'#F15A22'}
            style={{ width: '33%' }}
          />
        )}
        {typeof requestData.workPerson === 'number' && (
          <LegendItem
            text="Средняя за 2019, человек"
            value={String(requestData.workPerson)}
            style={{ width: '33%' }}
          />
        )}
        {typeof requestData.created === 'string' && (
          <LegendItem
            text="Дата подачи заявления"
            value={dateTimeFormat(requestData.created)}
            style={{ width: '33%' }}
          />
        )}
      </Box>
    </Box>
  );
});
