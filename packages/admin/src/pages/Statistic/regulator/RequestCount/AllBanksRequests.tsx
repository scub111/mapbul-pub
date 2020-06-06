import * as React from 'react';
import { Box } from 'grommet';
import { Text } from '@we-ui-components/base';
import { IBankInfo } from 'interfaces';
import { CompanyIcon } from 'pages/Processes';

interface IProps {
  onClose?: () => void;
  data: IBankInfo[];
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
          borderTop: '1px solid #CDDDF0',
        }}
      >
        <Box basis="200px">
          <Text size="medium" color="Black">
            Банк
          </Text>
        </Box>
        <Box direction="row" basis="200px" justify="end">
          <Text size="medium" color="Black">
            Количество заявлений
          </Text>
        </Box>
      </Box>
      <Box>{data.map(row => (
        <Box
          key={row.bankId}
          direction="row"
          justify="between"
          pad={{ horizontal: 'large', vertical: 'small' }}
        >
          <Box>
            <CompanyIcon size="small" companyId={row.bankId} />
          </Box>
          <Box direction="row" basis="200px" justify="end">
            <Text size="medium" color="BlackTxt">
              {row.value}
            </Text>
          </Box>
        </Box>
      ))}</Box>
    </Box>
  );
};
