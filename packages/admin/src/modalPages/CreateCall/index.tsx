import * as React from 'react';
import { useMemo, useRef, useState } from 'react';
import {
  Button,
  Text,
  Title,
  DisableWrap,
  DataItem,
  TextInput,
} from '@we-ui-components/base';
import {
  Form,
  MobxForm,
  NumberInput,
  isRequired,
  Select,
} from '@we-ui-components/form';
import styled, { withTheme } from 'styled-components';
import { observable } from 'mobx';
import { Box } from 'grommet';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores';
import { IRequestFormData, CompanyQualification } from 'interfaces';
import { CloseIcon, Spinner } from 'ui';
import { IStyledProps } from 'themes';
import {
  formatWithTwoDecimals,
  P,
  showMonths,
  isDefined,
  getMonthYear,
  showPeople,
} from 'utils';
import { CompanyInfo } from 'components';
import background from '../../assets/images/header.png';
import { isPositive } from 'utils/validators';
import { CallerInfoForBank } from './CallerInfoForBank';
import { DataItemEx } from './DataItemEx';

const Sticker = styled.div`
  padding: 8px 20px;
  border: 2px solid ${props => props.theme.palette.StandardWhite};
  border-radius: 4px;
  font-size: 14px;
  color: ${props => props.theme.palette.StandardWhite};
`;

export const CreateCall = withTheme(
  observer<IStyledProps & { onClose: () => void }>(({ theme, onClose }) => {
    const {
      user,
      modals,
      activeProcess,
      processList,
      actionModals,
      catalogs,
    } = useStores();

    const [qualification, setQualification] = useState<
      Partial<CompanyQualification>
    >({});

    const formRef = useRef<MobxForm>(null);
    const [error, setError] = useState<string>('');
    const isCaller = user.isContainOneOfRoles(['CALLER']);

    // hotfix - disable submit for bank, if search is not applied yet
    const [isSumbitDisabled, setIsSubmitDisabled] = useState<boolean>(
      !isCaller,
    );

    const companyFieldsDefault = {
      typeCompany: 0,
      companyName: '',
      companyInn: '',
      companyKpp: '',
      companyOgrn: '',
      directorFullName: '',
      okato: '',
      multyPayout: 1,
      multyNorthPayout: 1,
      prefRate: 0,
    };

    const observerData = useMemo(
      () =>
        observable({
          ...companyFieldsDefault,
          bankId: isCaller ? '' : user.company.id,
          personalCount: 0,
          declineReasonRegulator: '',
          declineReasonBank: '',
        } as IRequestFormData),
      [],
    );

    const onSubmit = () => {
      formRef.current
        .validateFields()
        .then(async (data: IRequestFormData) => {
          const create = () =>
            activeProcess
              .createCall({ ...qualification, ...data })
              .then(() => {
                modals.closeModal();
                processList.fetch();
              })
              .catch(err => {
                console.error(err);

                setError(err.message);
              });

          const isPrefRate = data.prefRate > 2;

          if (isPrefRate) {
            return actionModals.open(
              () => (
                <Box gap="10px" pad="large">
                  {isPrefRate && (
                    <Box>
                      Размер льготной ставки превышает ставку по постановлению
                      Правительства РФ от 16.05.2020 № 696.
                    </Box>
                  )}
                  <Box>Создать заявление?</Box>
                </Box>
              ),
              {
                title: 'Предупреждение',
                applyText: 'Создать',
                closeText: 'Отменить',
                noValidation: true,
                width: '550px',
                showOther: true,
                onApply: create,
              },
            );
          }

          return create();
        })
        .catch((err: any) => console.log(err));
    };

    const guarantorList = catalogs.companies
      .filter(c => c.type === 'BANK')
      .map(c => ({ text: c.name, value: c.id }));

    const handleCompanySearch = (company: IRequestFormData) => {
      const fillForm = (obj: Record<string, any>) => {
        for (const [key, value] of Object.entries(obj)) {
          if (isDefined(value)) {
            formRef.current.setField(key, value);
          }
        }
      };

      setQualification(company);

      fillForm(companyFieldsDefault);
      fillForm({
        ...company,
        okato: company.okato || '',
      });
      setIsSubmitDisabled(false);
    };

    const handleCompanyError = () => {
      setIsSubmitDisabled(false);
    };

    return (
      <Box width="100%" style={{ backgroundColor: 'white', padding: '0' }}>
        <Box
          direction="column"
          justify="between"
          align="start"
          pad={{ horizontal: 'xlarge', vertical: 'large' }}
          style={{ backgroundImage: `url(${background})`, height: 150 }}
        >
          <Box
            direction="row"
            justify="between"
            align="center"
            style={{ width: '100%' }}
          >
            <Title size="large" color="StandardWhite">
              Заявление
            </Title>
            {activeProcess.actionStatus === 'fetching' && (
              <Spinner style={{ width: 20, height: 20, marginLeft: 10 }} />
            )}
            <CloseIcon
              size="large"
              hover={true}
              onClick={onClose}
              fill="white"
            />
          </Box>
          <Sticker>Формирование</Sticker>
        </Box>
        {/* <TabWrap>
             <Tabs tabs={tabs} selected={'call'} />
          </TabWrap> */}
        <div>
          <Box>
            {/*<Title size="large">*/}
            {/*  {`Заявление №`}*/}
            {/*</Title>*/}
            {/*<Text size="medium" margin={{ bottom: 'small' }}>*/}
            {/*  {`от ${dateFormat(new Date())}`}*/}
            {/*</Text>*/}
            <Form ref={formRef} data={observerData} {...({} as any)}>
              <Box
                margin={{ top: 'medium', horizontal: 'xlarge' }}
                style={{ width: isCaller ? '400px' : '750px' }}
              >
                {isCaller ? (
                  <CompanyInfo
                    name={user.company.name}
                    inn={user.company.inn}
                    kpp={user.company.kpp}
                    ogrn={user.company.ogrn}
                    directorFullName={user.company?.meta?.directorFullName}
                  />
                ) : (
                  <CallerInfoForBank
                    qualification={qualification as CompanyQualification}
                    setQualification={setQualification}
                    observerData={observerData}
                    onSearch={handleCompanySearch}
                    onError={handleCompanyError}
                  />
                )}
              </Box>

              <Box
                width="750px"
                margin={{ top: 'medium', horizontal: '16px', bottom: 'xlarge' }}
                pad="medium"
                style={{ backgroundColor: '#FAFBFF' }}
              >
                <Title size="large" margin={{ bottom: 'medium' }}>
                  Данные заявления
                </Title>
                {isCaller ? (
                  <Box direction="row" align="start">
                    <Select
                      name={P<IRequestFormData>(p => p.bankId)}
                      size="xlarge"
                      label="Наименование банка"
                      noDefaultValue
                      placeholder="Выберите из списка..."
                      options={guarantorList}
                      rules={[isRequired]}
                    />
                    <Box margin={{ left: 'small' }}>
                      <Text
                        color="#ADAEBA"
                        size="xsmall"
                        margin="0 0 5px"
                        style={{ height: 19, opacity: 0.7 }}
                      >
                        БИК
                      </Text>
                      <TextInput
                        value={
                          catalogs.companies.find(
                            item => item.id === observerData.bankId,
                          )?.meta?.bik
                        }
                        size="xxlarge"
                        disabled
                        style={{ width: 240, height: 45 }}
                      />
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    {/* <Text
                      color="#ADAEBA"
                      size="xsmall"
                      margin="0 0 5px"
                      style={{ height: 19, opacity: 0.7 }}
                    >
                      Наименование банка
                    </Text>
                    <Text size="small" margin="0 0 15px">
                      {user.company.name}
                    </Text> */}
                  </Box>
                )}

                <Box
                  gap="20px"
                  direction="row"
                  align="start"
                  style={{ marginBottom: 20 }}
                >
                  {isDefined(observerData.personalMonth) && (
                    <DataItemEx
                      label={`Актуальная численность: ${getMonthYear(
                        observerData.personalMonth,
                      )}`}
                      value={showPeople(observerData.personalCount)}
                    />
                  )}
                  {isDefined(observerData.personalMay) && (
                    <DataItem
                      label="Численность на май 2020г."
                      value={showPeople(observerData.personalMay)}
                    />
                  )}
                </Box>
                <Box
                  gap="20px"
                  direction="row"
                  align="center"
                  style={{ marginBottom: 20 }}
                >
                  {isDefined(observerData.limitPayout) && (
                    <DataItem
                      label="Кредитный лимит, ₽"
                      value={formatWithTwoDecimals(observerData.limitPayout)}
                    />
                  )}
                  {isDefined(observerData.loanDays) && (
                    <DataItem
                      label="Срок кредитования, дней"
                      value={observerData.loanDays}
                    />
                  )}
                </Box>
                <Box gap="20px" direction="row" align="center">
                  <NumberInput
                    name={P<IRequestFormData>(p => p.prefRate)}
                    size="xlarge"
                    label="Размер льготной ставки, %"
                    type="currency"
                    min={0}
                    rules={[isRequired, isPositive]}
                  />
                </Box>
              </Box>
            </Form>
          </Box>
        </div>

        {error && (
          <Box align="center" pad={{ bottom: 'small', horizontal: 'xlarge' }}>
            <Text
              size="small"
              color="Red500"
              style={{ wordBreak: 'break-word' }}
            >
              {error}
            </Text>
          </Box>
        )}
        <DisableWrap disabled={activeProcess.actionStatus === 'fetching'}>
          <Box
            direction="row"
            justify="end"
            align="center"
            style={{
              padding: '0 40px',
              height: 112,
              borderTop: '1px solid #e7ecf7',
            }}
          >
            <Button onClick={onClose} transparent size="medium">
              Отмена
            </Button>
            <Button
              onClick={onSubmit}
              style={{ width: 234 }}
              disabled={isSumbitDisabled}
            >
              Сформировать
            </Button>
          </Box>
        </DisableWrap>
      </Box>
    );
  }),
);

export const periodOptions: Array<{ text: string; value: number }> = new Array(
  12,
)
  .fill(1)
  .map((_, i) => ({ text: showMonths(i + 1), value: i + 1 }));
