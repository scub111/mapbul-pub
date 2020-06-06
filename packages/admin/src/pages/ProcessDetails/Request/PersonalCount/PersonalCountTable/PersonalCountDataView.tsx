import * as React from 'react';
import { Box } from 'grommet';
import { Text } from '@we-ui-components/base';
import styled from 'styled-components';
import { isDefined } from 'utils';
import { PersonalCount } from 'interfaces';
import {
  RiskFinishWorkIcon,
  RiskBankruptcyIcon,
  RiskPayoutMoneyIcon,
  RiskPersonalIcon,
} from 'ui';

export function PersonalCountDataView({
  date,
  personalCount,
  riskBankruptcy,
  riskFinishWork,
  riskPayoutMoney,
  riskPersonal,
}: PersonalCount) {
  const isDecreaseIconVisible = riskPersonal === '1' || riskPersonal === '2';
  const decreaseIconColor = riskPersonal === '2' ? 'Red' : '#F19222';

  const areIndicatorsVisible =
    isDecreaseIconVisible ||
    riskBankruptcy ||
    riskFinishWork ||
    riskPayoutMoney;

  return (
    <Box width="calc(100% / 6)">
      <Cell align="center" pad={{ top: '35.65px', bottom: '18.35px' }}>
        <Text size="small">{getMonthName(date)}</Text>
      </Cell>

      <Cell
        flex={{ grow: 1 }}
        pad={{ top: '10.5px', bottom: '15.29px' }}
        align="center"
      >
        {isDefined(personalCount) ? personalCount : 'Нет данных'}

        {areIndicatorsVisible && (
          <Box margin={{ top: '9px' }} direction="row" gap="6px">
            {isDecreaseIconVisible && (
              <RiskPersonalIcon color={decreaseIconColor} />
            )}
            {riskBankruptcy && <RiskBankruptcyIcon />}
            {riskFinishWork && <RiskFinishWorkIcon />}
            {riskPayoutMoney && <RiskPayoutMoneyIcon />}
          </Box>
        )}
      </Cell>
    </Box>
  );
}

const Cell = styled(Box)`
  border-bottom: 1px solid #cdddf0;
`;

function getMonthName(date: string) {
  const index = Number(date.split('-')[1]) - 1;

  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  return months[index];
}
