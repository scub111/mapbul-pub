import * as React from 'react';
import { Box } from 'grommet';
import { Text } from '@we-ui-components/base';
import { IAllBankInfo } from 'interfaces';
import { CompanyIcon, CompanyName } from 'pages/Processes';
import { formatZeroDecimals } from 'utils';
interface IProps {
  onClose?: () => void;
  data: IAllBankInfo[];
}

export const AllBanksRequests = (props: IProps) => {
  const { data = [] } = props;

  return (
    <Box gap="8px" direction="column" margin={{ horizontal: 'small' }}>
      <Box
        direction="row"
        justify="between"
        align="center"
        pad={{ horizontal: 'large', vertical: 'medium' }}
        style={{
          borderBottom: '1px solid #CDDDF0',
        }}
      >
        <Box basis="260px">
          <Text size="medium" color="Black">
            Банк
          </Text>
        </Box>
        <Box direction="row" basis="180px">
          <Text size="medium" color="Black" style={{ width: '120px' }}>
            Одобренная сумма (₽)
          </Text>
        </Box>
        <Box direction="row" basis="140px">
          <Text size="medium" color="Black">
            Заявлений подано
          </Text>
        </Box>
        <Box direction="row" basis="100px">
          <Text size="medium" color="Black">
            Заявлений одобрено
          </Text>
        </Box>
      </Box>
      <Box>
        {data.map(row => (
          <Box
            key={row.bankId}
            direction="row"
            justify="between"
            pad={{ horizontal: 'large', vertical: 'small' }}
          >
            <Box basis="260px" align="start">
              <CompanyIcon size="small" companyId={row.bankId} />
              <Box
                direction="row"
                margin={{ top: 'xxsmall' }}
                style={{ overflow: 'hidden', maxHeight: '38px' }}
              >
                <CompanyName companyId={row.bankId} />
              </Box>
            </Box>
            <Box direction="row" basis="180px">
              <Text size="medium" color="BlackTxt">
                {formatZeroDecimals(row.acceptedAmountSum)}
              </Text>
            </Box>
            <Box direction="row" basis="140px">
              <Text size="medium" color="BlackTxt">
                {row.requestsByBank}
              </Text>
            </Box>
            <Box direction="row" basis="100px">
              <Text size="medium" color="BlackTxt">
                {row.acceptedRequests}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
