import * as React from 'react';
import { Box } from 'grommet';
import { Text } from '@we-ui-components/base';
import { observer } from 'mobx-react';
import { useStores } from 'stores';
import { CSSProperties } from 'react';
import { showRecords } from 'utils';
import { BackButton } from 'components';

export const BankInfo = observer(({ style }: { style?: CSSProperties }) => {
  const { user, dictPersons } = useStores();
  // const { companyId } = user.userInfo;
  return (
    <Box>
      <Box
        direction="row"
        align="center"
        style={{ marginBottom: 16, ...style }}
      >
        {/* <CompanyIcon companyId={companyId} margin={{ right: 'medium' }} />
        <Box justify="between" pad={{ vertical: '3px' }}>
          <Box direction="row" align="center">
            <Title size="large" bold style={{ marginRight: 10 }}>
              {user.company.name}
            </Title>
          </Box>
          <Title size="xxsmall" style={{ opacity: 0.7 }}>
            {`БИК ${user.company.meta?.bik}`}
          </Title>
        </Box> */}
        {user.isContainOneOfRoles(['BANK', 'REGULATOR', 'OBSERVER']) && <BackButton />}
      </Box>
      <Text size="small" color="#9698a7" margin={{ bottom: 'small' }}>
        {dictPersons.data ? showRecords(dictPersons.allData.length) : null}
      </Text>
    </Box>
  );
});
