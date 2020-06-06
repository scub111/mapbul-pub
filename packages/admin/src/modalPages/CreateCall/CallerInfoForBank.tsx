import * as React from 'react';
import { Box } from 'grommet';
import { StyledInput } from 'ui';
import { P } from 'utils';
import { IRequestFormData, CompanyQualification, CallerType } from 'interfaces';
import { oneOfLengths, isLengthBetween, limitLength } from 'utils/validators';
import { Text } from '@we-ui-components/base';
import { ButtonEx } from 'ui/ButtonEx';
import { Spinner2 } from 'ui/Spinner2';
import { QualificationReport } from 'components';
import { isRequired, NumberInput, Select } from '@we-ui-components/form';
import { useStores } from 'stores';
import { typeCompanyOptions, companyTypeOptions } from './config';

export const CallerInfoForBank = ({
  observerData,
  onSearch,
  qualification,
  setQualification,
  onError,
}: CallerInfoForBankProps) => {
  const [searchStatus, setSearchStatus] = React.useState(SearchStatus.IDLE);
  const [callerType, setCallerType] = React.useState<CallerType>(
    CallerType.UNKNOWN,
  );

  const { processList } = useStores();

  const onCompanySearch = async () => {
    setSearchStatus(SearchStatus.PENDING);

    const inn = observerData.companyInn;

    if (inn.length === 10) {
      setCallerType(CallerType.UL);
      observerData.companyType = 'LEGAL_ENTITY';
    }
    if (inn.length === 12) {
      setCallerType(CallerType.IP);
      observerData.companyType = 'INDIVIDUAL_ENTREPRENEUR';
    }

    try {
      const company = await processList.getCompanyByInnForBank(inn);
      onSearch(company);
      setSearchStatus(SearchStatus.IDLE);
    } catch {
      setSearchStatus(SearchStatus.ERROR);
      onError();
    }
  };

  return (
    <Box>
      <Box direction="row">
        <StyledInput
          name={P<IRequestFormData>(p => p.companyInn)}
          label="ИНН"
          placeholder="Введите ИНН"
          rules={[oneOfLengths([10, 12], 'Введите 10 (12 для ИП) цифр')]}
          mask="^[0-9]+$"
          onChange={() => setQualification({})}
          normalize={(value: string) => limitLength(value, 12)}
          style={{ width: 240 }}
        />

        <ButtonEx
          disabled={![10, 12].includes(observerData.companyInn.length)}
          spinnerRender={<Spinner2 width="19px" height="19px" color="white" />}
          isLoading={searchStatus === SearchStatus.PENDING}
          bgColor="Blue"
          style={{
            marginTop: 24,
            marginLeft: 20,
            padding: 12,
            lineHeight: '19px',
          }}
          onClick={() => {
            onCompanySearch();
          }}
        >
          {searchStatus === SearchStatus.PENDING ? '' : 'Найти'}
        </ButtonEx>

        {searchStatus === SearchStatus.ERROR && (
          <Box style={{ marginTop: 24, marginLeft: 24 }}>
            <Text color="Red" size="small">
              Данные о компании не найдены
            </Text>
            <Text color="Red" size="small">
              Осуществите ручной ввод
            </Text>
          </Box>
        )}
      </Box>

      {typeof qualification.enableHelps === 'boolean' && (
        <QualificationReport
          margin={{ bottom: '24px', top: '12px' }}
          params={qualification as CompanyQualification}
        />
      )}

      {(callerType === CallerType.UL || callerType === CallerType.IP) && (
        <Box direction="row" align="start" gap="18px">
          <Select
            name={P<IRequestFormData>(p => p.companyType)}
            label="Организационная форма"
            placeholder="Введите организационную форму"
            options={companyTypeOptions}
            size="xlarge"
            disabled
          />
          <Select
            name={P<IRequestFormData>(p => p.typeCompany)}
            label="Тип компании"
            placeholder="Введите тип компании"
            options={typeCompanyOptions}
            size="xlarge"
          />
        </Box>
      )}

      {callerType === CallerType.UL && <ULFields />}
      {callerType === CallerType.IP && <IPFields />}
      
      {callerType === CallerType.UL || callerType === CallerType.IP ? (
        <Box direction="row" align="start">
          <StyledInput
            name={P<IRequestFormData>(p => p.okato)}
            label="ОКАТО"
            placeholder="Введите ОКАТО"
            mask="^[0-9]+$"
            normalize={(value: string) => limitLength(value, 11)}
            rules={[isLengthBetween(11, 11)]}
            style={{
              width: 240,
              marginRight: 18,
            }}
          />
          <NumberInput
            name={P<IRequestFormData>(p => p.multyPayout)}
            label="Региональный коэффициент"
            placeholder="Введите рег. коэф."
            min={0}
            type="decimal"
            precision={2}
            style={{
              width: 240,
              marginRight: 18,
            }}
          />
          <NumberInput
            name={P<IRequestFormData>(p => p.multyNorthPayout)}
            label="Процентные надбавки"
            placeholder="Введите процентные надбавки"
            min={0}
            type="decimal"
            precision={2}
            style={{
              width: 240,
            }}
          />
        </Box>
      ) : null}
    </Box>
  );
};

const ULFields = () => (
  <>
    <Box direction="row" align="start">
      <StyledInput
        name={P<IRequestFormData>(p => p.companyKpp)}
        label="КПП"
        placeholder="Введите КПП"
        rules={[isLengthBetween(9, 9)]}
        mask="^[0-9]+$"
        normalize={(value: string) => limitLength(value, 9)}
        style={{
          width: 240,
          marginRight: 18,
        }}
      />

      <StyledInput
        name={P<IRequestFormData>(p => p.companyOgrn)}
        label="ОГРН"
        placeholder="Введите ОГРН"
        rules={[isLengthBetween(13, 13)]}
        mask="^[0-9]+$"
        normalize={(value: string) => limitLength(value, 13)}
        style={{
          width: 240,
        }}
      />
    </Box>
    <StyledInput
      style={{ width: '100%' }}
      name={P<IRequestFormData>(p => p.companyName)}
      size="xlarge"
      label="Наименование организации/обособленного подразделения организации"
      placeholder="Введите наименование организации"
      rules={[isRequired]}
    />
    <StyledInput
      name={P<IRequestFormData>(p => p.directorFullName)}
      // style={{ width: defaultFieldWidth }}
      label="ФИО руководителя"
      placeholder="Введите ФИО руководителя"
      rules={[isRequired]}
    />
  </>
);

const IPFields = () => (
  <Box>
    <Box margin={{ right: '18px' }} flex={{ grow: 1 }}>
      <StyledInput
        name={P<IRequestFormData>(p => p.companyName)}
        size="xlarge"
        label="Полное наименование"
        placeholder="Полное наименование организации"
        rules={[isRequired]}
        style={{
          width: '100%',
        }}
      />
    </Box>

    <StyledInput
      name={P<IRequestFormData>(p => p.companyOgrn)}
      label="ОГРН/ОГРНИП"
      placeholder="Введите ОГРН/ОГРНИП"
      rules={[isLengthBetween(15, 15)]}
      mask="^[0-9]+$"
      normalize={(value: string) => limitLength(value, 15)}
      style={{
        width: 240,
      }}
    />
  </Box>
);

type CallerInfoForBankProps = {
  observerData: IRequestFormData;
  qualification: CompanyQualification;
  onSearch: Function;
  onError: Function;
  setQualification: Function;
};

enum SearchStatus {
  IDLE,
  PENDING,
  ERROR,
}
