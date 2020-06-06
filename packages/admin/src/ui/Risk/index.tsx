import * as React from 'react';
import { Box } from 'grommet';
import { Text } from '@we-ui-components/base';
import { IRisk } from 'interfaces';
import {
  RiskPersonalIcon,
  RiskBankruptcyIcon,
  RiskFinishWorkIcon,
  RiskPayoutMoneyIcon,
} from 'ui';

const warnColor = '#F19222';
const errorColor = 'Red';

export const RiskNotification = ({
  riskPersonal,
  riskBankruptcy,
  riskFinishWork,
  riskPayoutMoney,
}: IRisk) => {
  const isVisible =
    riskPersonal === '1' ||
    riskPersonal === '2' ||
    riskBankruptcy ||
    riskFinishWork ||
    riskPayoutMoney;

  if (!isVisible) return null;
  return (
    <Box
      style={{
        background: '#FCDED3',
        borderRadius: 4,
      }}
      align="start"
      justify="center"
      pad={{ vertical: '24px', horizontal: '21px' }}
      gap="16px"
      width={{ max: 'unset', min: '770px' }}
    >
      {riskPersonal === '1' && (
        <RiskNotificationItem
          text="Произошло снижение численности заявителя более, чем на 10%"
          icon={RiskPersonalIcon}
          color={warnColor}
        />
      )}

      {riskPersonal === '2' && (
        <RiskNotificationItem
          text="Произошло снижение численности заявителя более, чем на 20%"
          icon={RiskPersonalIcon}
        />
      )}

      {riskBankruptcy && (
        <RiskNotificationItem
          text="Поступило сообщение о банкротстве заемщика"
          icon={RiskBankruptcyIcon}
        />
      )}

      {riskFinishWork && (
        <RiskNotificationItem
          text="Поступило сообщение о прекращении деятельности заемщика"
          icon={RiskFinishWorkIcon}
        />
      )}

      {riskPayoutMoney && (
        <RiskNotificationItem
          text="Заработная плата персонала заемщика ниже МРОТ"
          icon={RiskPayoutMoneyIcon}
        />
      )}
    </Box>
  );
};

interface RiskNotificationItemProps {
  text: React.ReactNode;
  icon: React.ElementType;
  color?: string;
}

function RiskNotificationItem({
  text,
  icon: Icon,
  color = errorColor,
}: RiskNotificationItemProps) {
  return (
    <Box align="start" direction="row">
      <Icon color={color} />
      <Text margin={{ left: 'xsmall' }} color={color}>
        {text}
      </Text>
    </Box>
  );
}
