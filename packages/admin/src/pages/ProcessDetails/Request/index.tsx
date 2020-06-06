import * as React from 'react';
import * as _ from 'lodash';
import { useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from 'grommet';
import { useStores } from 'stores';
import { ProcessHistory } from '../components/ProcessHistory';
import { DataContainer } from './DataContainer';
import { Body, Header } from '../components';
import {
  Form,
  MobxForm,
  TextArea,
  NumberInput,
  isRequired,
} from '@we-ui-components/form';
import { observable } from 'mobx';
import { MODAL_MODE, ProcessActions } from '../components/ProcessActions';
import { Button, DataItem, DisableWrap, Title } from '@we-ui-components/base';
import { BorderedButtonBlue, CancelButton, Footer } from 'components';
import { Error, RateLine } from 'ui';
import { maxLength } from 'utils/validators';
import { TRequestAction } from 'services';
import { PROCESS_TYPE, REQUEST_STATUS } from 'interfaces';
import { formatWithTwoDecimals } from '../../../utils';
const { useState } = React;

// const OFFER_ACTIONS_ROLES: TRole[] = ['GUARANTOR'];

export const RequestDetails = observer<{ onDismiss: () => void }>(
  ({ onDismiss }) => {
    const [error, setError] = useState<string>('');
    const [mode, setMode] = useState<MODAL_MODE>(MODAL_MODE.INFO);
    const { activeProcess, user, actionModals, modals } = useStores();

    const { requestData: data, actionStatus } = activeProcess;

    if (!data) {
      return null;
    }

    const isPending = data ? activeProcess.isPending : false;

    const observableData = useMemo(
      () =>
        observable({
          reason: '',
          regulatorStatus: '' as any,
          count: '',
          acceptedAmount: data.acceptedAmount || '',
          period: data.period,
        }),
      [],
    );

    const formRef = useRef<MobxForm>(null);

    const isRegulator = user.isContainRoles(['REGULATOR']);
    const isUserOwner = data.bankId === user.userInfo.companyId;

    const isRegulatorActions =
      data.status !== REQUEST_STATUS.CANCELED && isRegulator;

    const isBankActions =
      user.isContainRoles(['BANK']) &&
      isUserOwner &&
      data.status === REQUEST_STATUS.CREATED;

    // Cancel action
    const isCorrector = user.isContainRoles(['CORRECTOR']);

    let isCancelAction = false;

    if (isCorrector) {
      if (isRegulator) {
        isCancelAction = isRegulatorActions;
      } else {
        isCancelAction =
          data.status !== REQUEST_STATUS.CANCELED &&
          isUserOwner &&
          (mode === MODAL_MODE.DEFAULT || mode === MODAL_MODE.INFO);
      }
    }

    let isRevertAction = false;

    // if (
    //   data.status === REQUEST_STATUS.BANK_APPROVED ||
    //   data.status === REQUEST_STATUS.BANK_DECLINED
    // ) {
    //   if (!user.isContainRoles(['BANK']) || isUserOwner) {
    //     isRevertAction = true;
    //   }
    // }

    let isChangeAmountAction =
      user.isContainRoles(['BANK']) &&
      isUserOwner &&
      data.status === REQUEST_STATUS.BANK_APPROVED;

    const isDefaultMode =
      mode === MODAL_MODE.ACCEPT ||
      mode === MODAL_MODE.REJECT ||
      mode === MODAL_MODE.INFO;

    const callAction = () => {
      return formRef.current
        .validateFields()
        .then((formData: typeof observableData) => {
          let action: TRequestAction, dataReq: any;

          const callAction = () =>
            activeProcess
              .requestAction(data.id, action, dataReq)
              .then(() => onDismiss())
              .catch(err => setError(err.message));

          if (isRevertAction && mode === MODAL_MODE.REVERT) {
            action = 'rollback';
            dataReq = { reason: formData.reason };

            return callAction();
          }

          if (isChangeAmountAction && mode === MODAL_MODE.CHANGE_AMOUNTS) {
            action = 'changeAmounts';
            dataReq = {
              reason: formData.reason,
              acceptedAmount: formData.acceptedAmount,
            };

            // if (data.status !== REQUEST_STATUS.BANK_APPROVED) {
            //   delete dataReq.acceptedAmount;
            // }

            return callAction();
          }

          if (isBankActions) {
            if (mode === MODAL_MODE.REJECT) {
              action = 'reject';
              dataReq = { reason: formData.reason };

              return callAction();
            }

            if (mode === MODAL_MODE.ACCEPT) {
              action = 'accept';
              dataReq = { acceptedAmount: formData.acceptedAmount };

              return callAction();
            }
          } else {
            if (data.regulatorStatus) {
              action = 'updateRegulatorStatus';
              dataReq = { status: formData.regulatorStatus };

              return callAction();
            } else {
              action = 'process';
              dataReq = { regulatorStatus: formData.regulatorStatus };

              return callAction();
            }
          }

          return callAction();
        });
    };

    const callCancelAction = () => {
      return actionModals.open(
        () => (
          <Box pad="large">
            Отозвать заявление? Это действие необратимо. Работа с заявлением
            станет невозможной.
          </Box>
        ),
        {
          title: 'Предупреждение',
          applyText: 'Подтвердить',
          closeText: 'Отменить',
          noValidation: true,
          width: '500px',
          showOther: true,
          onApply: () =>
            activeProcess
              .requestAction(data.id, 'cancel')
              .then(() => onDismiss())
              .catch(err => setError(err.message)),
        },
      );
    };

    const calculateStatus = _.debounce((count: number) => {
      if (!count) {
        return;
      }

      const diff = 1 - (data.personalCount - count) / data.personalCount;

      if (diff >= 1) {
        observableData.regulatorStatus = 'A';
      } else if (diff > 0.9) {
        observableData.regulatorStatus = 'B';
      } else if (diff > 0.8) {
        observableData.regulatorStatus = 'C';
      } else {
        observableData.regulatorStatus = 'D';
      }
    }, 500);

    let regulatorActionText = 'Обработать';

    if (data.regulatorStatus) {
      regulatorActionText = 'Обновить оценку';
    }

    const showCount =
      ((user.isContainRoles(['BANK']) && isUserOwner) ||
        user.isContainRoles(['REGULATOR']) ||
        user.isContainRoles(['OBSERVER'])) &&
      (data.status === REQUEST_STATUS.CREATED ||
        data.status === REQUEST_STATUS.BANK_APPROVED);

    return (
      <Box>
        <Header
          title={'Карточка заявления'}
          status={data.status}
          type={PROCESS_TYPE.REQUEST}
          onClose={onDismiss}
          pending={isPending}
        >
          {isRevertAction ? (
            <Button
              disabled={activeProcess.isPending}
              margin="0 0 0 24px"
              style={{ padding: '13px 16px' }}
              onClick={() => {
                setMode(MODAL_MODE.REVERT);
                setTimeout(() => modals.scrollTo && modals.scrollTo(), 100);
              }}
            >
              Отменить решение банка
            </Button>
          ) : null}
        </Header>
        <Box>
          <Form ref={formRef} data={observableData} {...({} as any)}>
            <Box direction="column">
              <Body>
                <DataContainer data={data} showCount={showCount}>
                  {isChangeAmountAction ? (
                    <BorderedButtonBlue
                      disabled={activeProcess.isPending}
                      margin="0 0 0 24px"
                      transparent={true}
                      color="#0066B3"
                      style={{ padding: '13px 16px' }}
                      onClick={() => {
                        setMode(MODAL_MODE.CHANGE_AMOUNTS);
                        setTimeout(
                          () => modals.scrollTo && modals.scrollTo(),
                          100,
                        );
                      }}
                    >
                      Изменить суммы
                    </BorderedButtonBlue>
                  ) : null}
                </DataContainer>
                <Box margin={{ top: showCount ? '90px' : 'large' }}>
                  <ProcessHistory id={data.id} processType={'REQUEST'} />
                </Box>
              </Body>

              {mode === MODAL_MODE.CHANGE_AMOUNTS ? (
                <Box
                  style={{ borderTop: '1px solid rgb(231, 236, 247)' }}
                  pad="xlarge"
                >
                  <Title color="Black">
                    Изменение одобренной суммы кредита
                  </Title>
                  <Box gap="20px" direction="column" margin={{ top: 'medium' }}>
                    <Box gap="40px" direction="row" align="start">
                      {data.status === REQUEST_STATUS.BANK_APPROVED ? (
                        <NumberInput
                          type="decimal"
                          name="acceptedAmount"
                          label="Одобренная сумма кредита, ₽"
                          min={0}
                          size="xlarge"
                          placeholder="0,00"
                          rules={[isRequired]}
                        />
                      ) : null}

                      <Box margin={{ bottom: '10px' }}>
                        <DataItem
                          label="Кредитный лимит, ₽"
                          value={formatWithTwoDecimals(data.limitPayout)}
                        />
                      </Box>
                    </Box>

                    <TextArea
                      name="reason"
                      label="Причина изменения"
                      placeholder="Укажите причину изменения"
                      required
                      rules={[maxLength(255)]}
                      style={{ height: '128px' }}
                    />
                  </Box>
                </Box>
              ) : null}

              {mode === MODAL_MODE.REVERT ? (
                <Box
                  style={{ borderTop: '1px solid rgb(231, 236, 247)' }}
                  pad="xlarge"
                >
                  <Title color="Black">Причина отмены</Title>
                  <TextArea
                    name="reason"
                    label=""
                    placeholder="Укажите причину отмены"
                    required
                    rules={[maxLength(255)]}
                    style={{ height: '128px' }}
                  />
                </Box>
              ) : null}

              {mode === MODAL_MODE.REJECT ? (
                <Box
                  style={{ borderTop: '1px solid rgb(231, 236, 247)' }}
                  pad="xlarge"
                >
                  <Title color="Black">Причина отклонения</Title>
                  <TextArea
                    name="reason"
                    label=""
                    placeholder="Укажите причину отклонения"
                    required
                    rules={[maxLength(255)]}
                    style={{ height: '128px' }}
                  />
                </Box>
              ) : null}

              {isRegulatorActions && mode === MODAL_MODE.ACCEPT ? (
                <Box
                  style={{ borderTop: '1px solid rgb(231, 236, 247)' }}
                  pad="xlarge"
                >
                  <Title color="Black" margin={{ bottom: 'xsmall' }}>
                    Признак соответствия информации от организации и данных ФНС
                  </Title>
                  <NumberInput
                    name="count"
                    label="Численность сотрудников по данным ФНС (человек)"
                    min={0}
                    size="xlarge"
                    placeholder="0"
                    required
                    onChange={calculateStatus}
                  />
                  {observableData.regulatorStatus ? (
                    <RateLine status={observableData.regulatorStatus} />
                  ) : null}
                </Box>
              ) : null}

              {isBankActions && mode === MODAL_MODE.ACCEPT ? (
                <Box
                  style={{ borderTop: '1px solid rgb(231, 236, 247)' }}
                  pad="xlarge"
                >
                  <Title color="Black" margin={{ bottom: 'xsmall' }}>
                    Одобренная сумма кредита
                  </Title>
                  <NumberInput
                    type="decimal"
                    name="acceptedAmount"
                    label="Укажите одобренную сумму (руб.)"
                    min={0}
                    size="xlarge"
                    placeholder="0,00"
                    required
                  />
                </Box>
              ) : null}
            </Box>
          </Form>

          {error && <Error error={error} />}

          <DisableWrap disabled={actionStatus === 'fetching'}>
            <Footer>
              <Box direction="row" justify="between" style={{ width: '100%' }}>
                {isCancelAction ? (
                  <CancelButton
                    disabled={activeProcess.isPending}
                    margin="0 24px 0 0"
                    onClick={() => {
                      callCancelAction();
                    }}
                  />
                ) : (
                  <Box />
                )}
                {isRegulatorActions && isDefaultMode && (
                  <ProcessActions
                    isActionEnabled={!isRegulator}
                    mode={mode}
                    isDisabled={activeProcess.isPending}
                    setMode={setMode}
                    onClose={onDismiss}
                    onAccept={() =>
                      mode === MODAL_MODE.ACCEPT
                        ? callAction()
                        : setMode(MODAL_MODE.ACCEPT)
                    }
                    onReject={onDismiss}
                    rejectText="Закрыть"
                    acceptText={
                      mode !== MODAL_MODE.ACCEPT
                        ? regulatorActionText
                        : 'Подтвердить'
                    }
                  />
                )}
                {isBankActions && isDefaultMode && (
                  <ProcessActions
                    isActionEnabled={true}
                    mode={mode}
                    isDisabled={activeProcess.isPending}
                    setMode={setMode}
                    onClose={onDismiss}
                    onAccept={() =>
                      mode === MODAL_MODE.ACCEPT
                        ? callAction()
                        : setMode(MODAL_MODE.ACCEPT)
                    }
                    onReject={() =>
                      mode === MODAL_MODE.REJECT
                        ? callAction()
                        : setMode(MODAL_MODE.REJECT)
                    }
                    rejectText={
                      mode !== MODAL_MODE.REJECT
                        ? 'Отклонить'
                        : 'Подтвердить отклонение'
                    }
                    acceptText={
                      mode !== MODAL_MODE.ACCEPT ? 'Одобрить' : 'Подтвердить'
                    }
                  />
                )}
                {mode === MODAL_MODE.REVERT ||
                mode === MODAL_MODE.CHANGE_AMOUNTS ? (
                  <ProcessActions
                    isActionEnabled={true}
                    mode={MODAL_MODE.ACCEPT}
                    isDisabled={activeProcess.isPending}
                    setMode={setMode}
                    onClose={onDismiss}
                    onAccept={() => callAction()}
                    onReject={() => setMode(MODAL_MODE.INFO)}
                    rejectText="Отмена"
                    acceptText="Сохранить изменения"
                  />
                ) : null}

                {!isBankActions &&
                !isRegulatorActions &&
                mode === MODAL_MODE.INFO ? (
                  <Button size="auto" onClick={onDismiss}>
                    Закрыть
                  </Button>
                ) : null}
              </Box>
            </Footer>
          </DisableWrap>
        </Box>
      </Box>
    );
  },
);
