import * as React from 'react';
import { Title, Text } from '@we-ui-components/base';
import { Box } from 'grommet';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores';
import { CSSProperties } from 'react';
import { formatZeroDecimals } from 'utils';

const COLOR1 = '#19B97C';
const COLOR2 = '#FFD037';
const COLOR3 = '#F19222';
const COLOR4 = '#F15A22';

interface IWidgetData {
  percent: number;
  color: string;
}

const Widget: React.FC<{
  data: Array<IWidgetData>;
  style?: CSSProperties;
}> = ({ data, style }) => (
  <div
    style={{
      display: 'flex',
      width: '100%',
      height: 8,
      ...style,
    }}
  >
    {data.map(item => (
      <div
        style={{
          width: `${item.percent}%`,
          background: item.color,
        }}
      />
    ))}
  </div>
);

export const LegendItem: React.FC<{
  text: string;
  value: number;
  color?: string;
  style?: CSSProperties;
}> = ({ value, text, color = 'red', style }) => (
  <Box style={{ ...style }} direction="row" align="center">
    <div style={{ borderLeft: `2px solid ${color}`, height: 16 }} />
    <Box direction="row" justify="between" width="100%" margin="0 30px 0 16px">
      <Text size="small">{text}</Text>
      <Text size="small">{formatZeroDecimals(value)}</Text>
    </Box>
  </Box>
);

export const SpecialFNS = observer(() => {
  const { statistics } = useStores();
  const {
    totalProcessed,
    aaaCount,
    aaCount,
    acount,
    bcount,
    ccount,
    dcount,
  } = statistics.general.fnsStatistics;

  const goodCount = aaaCount + aaCount + acount;

  const total = goodCount + bcount + ccount + dcount;

  return (
    <Box
      direction="column"
      pad="large"
      background="#FFFFFF"
      style={{ minWidth: 580, flex: '1 1 100%' }}
      justify="between"
    >
      <Title style={{ marginBottom: 24 }}>
        Превышение численности в заявлениях
      </Title>
      <Text size="large">Заявлений обработано ФНС</Text>
      <Title style={{ marginBottom: 24 }}>
        {formatZeroDecimals(totalProcessed)}
      </Title>
      {total > 0 && (
        <Widget
          data={[
            { percent: (goodCount / total) * 100, color: COLOR1 },
            { percent: (bcount / total) * 100, color: COLOR2 },
            { percent: (ccount / total) * 100, color: COLOR3 },
            { percent: (dcount / total) * 100, color: COLOR4 },
          ]}
          style={{ marginBottom: 40 }}
        />
      )}
      <Box direction="row" width="100%" style={{ marginBottom: 16 }}>
        <LegendItem
          text="Не превышает"
          value={goodCount}
          color={COLOR1}
          style={{ width: '50%' }}
        />
        <LegendItem
          text="Существенно"
          value={bcount}
          color={COLOR2}
          style={{ width: '50%' }}
        />
      </Box>
      <Box direction="row" width="100%">
        <LegendItem
          text="Незначительно"
          value={ccount}
          color={COLOR3}
          style={{ width: '50%' }}
        />
        <LegendItem
          text="Значительно"
          value={dcount}
          color={COLOR4}
          style={{ width: '50%' }}
        />
      </Box>
    </Box>
  );
});
