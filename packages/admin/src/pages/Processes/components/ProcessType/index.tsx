import * as React from 'react';
import { Box } from 'grommet';
import { Text } from '@we-ui-components/base';
import { IProcess, PROCESS_TYPE } from 'interfaces';
import { plural } from 'utils';
import styled from 'styled-components';

const dictionary = ['день', 'дня', 'дней'];

export const ProcessType: React.FC<{
  data: IProcess;
}> = ({ data }) => {
  const restDays = data.daysLeft;
  let text = 'Осталось: ';

  text +=
    isNaN(restDays) ||
    data.status === 'CLOSED' ||
    data.status === 'REJECTED' ||
    data.status === 'CANCELED' ||
    restDays === -1
      ? '--'
      : ` ${restDays} ${plural(restDays, dictionary)}`;

  return (
    <Box>
      <Text size="xsmall">{documentTypeMapping[data.type]}</Text>
      <Text size="xxsmall" color="#9698a7">
        {text}
      </Text>
    </Box>
  );
};

const documentTypeMapping: Record<PROCESS_TYPE, string> = {
  CALL: 'Заявка',
  GUARANTEE: 'Гарантия',
  CLAIM: 'Заявка на снижение суммы',
  REQUIREMENT: 'Требование платежа',
  REQUEST: 'Заявление',
};

const colorMap: Record<PROCESS_TYPE, string> = {
  CALL: '#d2d6e1',
  GUARANTEE: '#4740a1',
  CLAIM: '#54a867',
  REQUIREMENT: '#ee9f18',
  REQUEST: '#ee9f18',
};

function getProcessColorByType(type: PROCESS_TYPE) {
  return colorMap[type] || '#ddd';
}

const ColoredBox = styled.div`
  height: 100%;
  min-height: 40px;
  width: 2px;
  position: absolute;
  left: -12px;
  background-color: ${props => props.color};
`;

const WrapBox = styled.div`
  height: inherit;
  width: 2px;
  position: relative;
  display: flex;
  align-items: center;
`;

export const ProcessColorType: React.FC<{
  type: PROCESS_TYPE;
}> = ({ type }) => {
  const color = getProcessColorByType(type);

  return (
    <WrapBox>
      <ColoredBox color={color} />
    </WrapBox>
  );
};
