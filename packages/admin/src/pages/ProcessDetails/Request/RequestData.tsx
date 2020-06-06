import * as React from 'react';
import { Box } from 'grommet';
import { IRequest, CompanyQualification } from 'interfaces';
import { observer } from 'mobx-react-lite';
import { Title, Text, DataItem } from '@we-ui-components/base';
import {
  formatToDateString,
  dateFormat,
  formatWithTwoDecimals,
  isDefined,
  showPeople,
} from 'utils';
import { RequestTableStatus } from 'ui';
import { QualificationReport } from 'components';

const companyTypes = {
  LEGAL_ENTITY: 'Юридическое лицо',
  INDIVIDUAL_ENTREPRENEUR: 'ИП',
};

const getTypeCompany = (type: number) => {
  switch (type) {
    case 1:
      return 'Микробизнес';
    case 2:
      return 'Малый бизнес';
    default:
      return 'Крупный бизнес';
  }
};

export const RequestData = observer<{
  data: IRequest & CompanyQualification;
  children: React.ReactNode;
}>(({ data, children }) => {
  // check
  const isUL = data.companyInn.length === 10;

  return (
    <Box gap="22px">
      <Box>
        <Title color="Black">Заявление № {data.number}</Title>
        <Text size="xsmall" color="Black">
          от {formatToDateString(data.created)}
        </Text>
      </Box>

      <Title color="Black">Заявитель</Title>

      <DataItem
        label="Наименование организации/обособленного подразделения организации"
        value={data.companyName}
      />

      <Box direction="row">
        <DataItem label="ИНН" value={data.companyInn} style={{ width: 280 }} />
        {data.companyType !== 'INDIVIDUAL_ENTREPRENEUR' && (
          <DataItem
            label="КПП"
            value={data.companyKpp}
            style={{ marginRight: 200 }}
          />
        )}
        <DataItem label="ОГРН" value={data.companyOgrn} />
      </Box>

      <Box direction="row">
        <DataItem
          label="ОКАТО"
          value={data.okato || '-'}
          style={{ width: 280 }}
        />
        <DataItem
          label="Региональный коэффициент"
          value={data.multyPayout || '-'}
          style={{ width: 280 }}
        />
        {isDefined(data.multyNorthPayout) && (
          <DataItem
            label="Процентные надбавки"
            value={data.multyNorthPayout.toString()}
          />
        )}
      </Box>

      <Box direction="row">
        {isUL && (
          <DataItem
            label="ФИО руководителя"
            value={data.directorFullName}
            style={{ width: 280 }}
          />
        )}
        <DataItem
          label="Организационная форма"
          value={companyTypes[data.companyType] || '-'}
          style={{ width: 280 }}
        />
        <DataItem
          label="Тип компании"
          value={getTypeCompany(data.typeCompany)}
        />
      </Box>

      <QualificationReport params={data} width={{ min: '770px' }} />

      <Box
        style={{
          background: '#FAFBFF',
          marginLeft: '-22px',
          padding: '22px 53px 22px 22px',
        }}
      >
        <Box
          direction="row"
          justify="between"
          align="baseline"
          margin={{ bottom: '10px' }}
        >
          <Title margin={{ bottom: 'medium' }} color="Black">
            Данные заявления
          </Title>
          {children}
        </Box>
        <Box direction="row" justify="between" style={{ width: '100%' }}>
          <Box gap="22px" direction="column">
            <DataItem label="Наименование банка" value={data.bankName} />
            {isDefined(data.personalMonth) && isDefined(data.personalCount) ? (
              <DataItem
                label="Численность на дату подачи заявления"
                value={`${data.personalMonth}: ${data.personalCount} чел.`}
              />
            ) : null}
            <DataItem label="Размер льготной ставки, %" value={data.prefRate} />
            {isDefined(data.personalMay) && (
              <DataItem
                label="Численность на май 2020г."
                value={showPeople(data.personalMay)}
              />
            )}
          </Box>

          <Box gap="22px" direction="column">
            <DataItem label="БИК" value={data.bik} />
            <DataItem label="Срок кредитования, дней" value={data.period} />
            {data.acceptedAmount ? (
              <DataItem
                label="Одобренная сумма кредита, ₽"
                value={formatWithTwoDecimals(data.acceptedAmount)}
              />
            ) : null}
            <DataItem
              label="Кредитный лимит, ₽"
              value={formatWithTwoDecimals(data.limitPayout)}
            />
          </Box>
        </Box>
      </Box>

      {data.declineReasonRegulator ? (
        <Box>
          <Title color="Black">Комментарий ФНС</Title>
          <DataItem label="" value={data.declineReasonRegulator} />
        </Box>
      ) : null}

      {data.otherRequests && data.otherRequests.length ? (
        <Box
          style={{
            background: '#FAFBFF',
            marginLeft: '-22px',
            padding: '22px',
          }}
        >
          <Title color="Black">
            Ранее поданные заявления ({data.otherRequests.length})
          </Title>
          <Box gap="8px" direction="column" margin={{ top: 'small' }}>
            <Box direction="row" justify="between">
              <Box basis="150px">
                <Text size="small" color="BlackTxt">
                  Дата
                </Text>
              </Box>
              <Box basis="200px">
                <Text size="small" color="BlackTxt">
                  Банк
                </Text>
              </Box>
              <Box basis="170px" pad={{ left: '10px' }}>
                <Text size="small" color="BlackTxt">
                  Статус
                </Text>
              </Box>
            </Box>
            {data.otherRequests.map(request => (
              <Box key={request.id} direction="row" justify="between">
                <Box basis="150px">
                  <Text size="small" color="BlackTxt">
                    {dateFormat(request.created, true)}
                  </Text>
                </Box>
                <Box basis="200px">
                  <Text size="small" color="BlackTxt">
                    {request.bankName}
                  </Text>
                </Box>
                <Box basis="170px">
                  <RequestTableStatus data={request as any} size="small" />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ) : null}

      {data.declineReasonBank ? (
        <Box>
          <Title color="Black">Причина отклонения Банком</Title>
          <DataItem label="" value={data.declineReasonBank} />
        </Box>
      ) : null}
    </Box>
  );
});
